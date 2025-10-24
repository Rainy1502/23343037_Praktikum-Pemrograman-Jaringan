/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

/* 
    -------------------------------------
                Percobaan 1
    -------------------------------------
*/

/*
const url = 'http://api.weatherstack.com/current?access_key=dc27067c15b1ef208aae88d5e56b943e&query=-0.8969640644476816,100.35064877962922'

fetch(url)
  .then(response => {
    console.log(response) // Baris 4
    return response.json()
  })
  .then(data => {
    // console.log(data) // Baris 5
    // console.log(data.current) // Baris 6
    console.log(data.current.temperature) // Baris 7
  })
  .catch(error => console.error(error))
*/

/* 
    -------------------------------------
                Percobaan 2
    -------------------------------------
*/

/*
const geocodeURL = 'https://photon.komoot.io/api/?q=Padang&limit=3'
const urlCuaca = 'http://api.weatherstack.com/current?access_key=dc27067c15b1ef208aae88d5e56b943e&query=-0.8969640644476816,100.35064877962922&units=m'

fetch(urlCuaca)
  .then(response => response.json())
  .then(data => {
    console.log(
      'Saat ini suhu diluar mencapai ' +
      data.current.temperature +
      ' derajat celcius. Kemungkinan terjadinya hujan adalah ' +
      data.current.precip +
      '%.'
    )
  })

fetch(geocodeURL)
  .then(response => response.json())
  .then(data => {
    const latitude = data.features[2].geometry.coordinates[1]
    const longitude = data.features[2].geometry.coordinates[0]
    const placeName = data.features[0].properties.name
    const placeType = data.features[0].properties.type

    console.log('Hasil Geocoding:')
    console.log('Nama Tempat:', placeName)
    console.log('Tipe Tempat:', placeType)
    console.log('Latitude:', latitude)
    console.log('Longitude:', longitude)
  })
  .catch(error => console.error('Terjadi kesalahan:', error))
  */


/* 
    -------------------------------------
                Percobaan 3
    -------------------------------------
*/

  /*
const lokasi = 'Padang Panjang Timur'
const geocodeURL = `https://photon.komoot.io/api/?q=${encodeURIComponent(lokasi)}&limit=1`

fetch(geocodeURL)
  .then(response => response.json())
  .then(data => {
    // Ambil data hasil geocoding
    const query = lokasi
    const placeName = data.features[0].properties.name
    const city = data.features[0].properties.city || ''
    const state = data.features[0].properties.state || ''
    const country = data.features[0].properties.country || ''
    const placeType = data.features[0].properties.type

    const fullPlaceName = [placeName, city, state, country]
      .filter(Boolean) // hapus yang kosong
      .join(', ')

    console.log('data yang anda cari adalah:', query)
    console.log('data yang ditemukan adalah:', fullPlaceName)
    console.log('tipe lokasi adalah:', placeType)
  })
  .catch(error => console.error('Terjadi kesalahan:', error))
*/

/* 
    -------------------------------------
                Percobaan 4
    -------------------------------------
*/

const lokasi = 'Padang'
const geocodeURL = `https://photon.komoot.io/api/?q=${encodeURIComponent(lokasi)}&limit=1`

fetch(geocodeURL)
  .then(response => response.json())
  .then(data => {
    const placeName = data.features[0].properties.name
    const city = data.features[0].properties.city || ''
    const state = data.features[0].properties.state || ''
    const country = data.features[0].properties.country || ''
    const placeType = data.features[0].properties.type
    const latitude = data.features[0].geometry.coordinates[1]
    const longitude = data.features[0].geometry.coordinates[0]

    const fullPlaceName = [placeName, city, state, country].filter(Boolean).join(', ')

    console.log(`Koordinat lokasi anda adalah ${latitude}, ${longitude}`)
    console.log(`Data yang anda cari adalah: ${lokasi}`)
    console.log(`Data yang ditemukan adalah: ${fullPlaceName}`)
    console.log(`Tipe lokasi adalah: ${placeType}`)

    const weatherURL = `http://api.weatherstack.com/current?access_key=dc27067c15b1ef208aae88d5e56b943e&query=${latitude},${longitude}&units=m`
    
    return fetch(weatherURL)
  })
  .then(response => response.json())
  .then(weather => {
    const suhu = weather.current.temperature
    const hujan = weather.current.precip
    const tempat = weather.location.name

    console.log(`Saat ini suhu di ${tempat} mencapai ${suhu} derajat celcius.`)
    console.log(`Kemungkinan terjadinya hujan adalah ${hujan}%`)
  })
  .catch(error => console.error('Terjadi kesalahan:', error))