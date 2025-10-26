import nodeFetch from 'node-fetch';
// Gunakan `globalThis.fetch` jika tersedia (Node 18+), atau fallback ke node-fetch.
const fetch = globalThis.fetch ?? nodeFetch;

// Cache sederhana untuk hasil geocoding agar tidak memanggil layanan berulang
// ketika alamat yang sama diminta beberapa kali. Mengurangi kemungkinan rate-limit.
const geocodeCache = new Map();
const DEFAULT_TTL = 10 * 60 * 1000; // 10 menit
const ERROR_TTL = 60 * 1000; // 1 menit untuk cache error/negatif

const makeCacheKey = (address) => (address || '').toString().trim().toLowerCase();

/**
 * geocode(address, callback, options)
 * - address: string alamat yang akan dicari
 * - callback: (error, result) => void
 * - options: { ttl }
 *
 * Fungsi ini mengembalikan objek { latitude, longitude, location } atau error.
 * Implementasi menggunakan Photon (komoot) sebagai penyedia geocoding publik.
 */
const geocode = async (address, callback, options = {}) => {
  const ttl = typeof options.ttl === 'number' ? options.ttl : DEFAULT_TTL;
  const key = makeCacheKey(address);

  // Kembalikan dari cache jika tersedia dan belum kadaluarsa
  const cached = geocodeCache.get(key);
  if (cached && (Date.now() - cached.stamp) < ttl) {
    if (cached.error) return callback(cached.error, undefined);
    return callback(undefined, cached.value);
  }

  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errMsg = `Gagal menghubungi layanan lokasi (HTTP ${response.status}).`;
      // cache respons negatif sebentar untuk menghindari retry segera
      try { geocodeCache.set(key, { stamp: Date.now(), error: errMsg }); } catch(_) {}
      return callback(errMsg, undefined);
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      const errMsg = 'Tidak dapat menemukan lokasi. Coba lokasi lain.';
      try { geocodeCache.set(key, { stamp: Date.now(), error: errMsg }); } catch(_) {}
      return callback(errMsg, undefined);
    }

    const { coordinates } = data.features[0].geometry;
    const { name, country } = data.features[0].properties;

    const result = {
      latitude: coordinates[1],
      longitude: coordinates[0],
      location: `${name}, ${country}`,
    };

    // Simpan ke cache (best-effort)
    try {
      geocodeCache.set(key, { stamp: Date.now(), value: result });
    } catch (_) {
      // cache bersifat best-effort; kesalahan cache tidak mengganggu alur
    }

    callback(undefined, result);
  } catch (error) {
    const errMsg = 'Tidak dapat terkoneksi ke layanan lokasi.';
    try { geocodeCache.set(key, { stamp: Date.now(), error: errMsg }); } catch(_) {}
    callback(errMsg, undefined);
  }
};

export default geocode;