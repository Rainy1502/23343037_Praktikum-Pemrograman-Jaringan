/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

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

    // Akses deskripsi cuaca (karena berupa array)
    console.log('Deskripsi cuaca:', data.current.weather_descriptions[0])
    console.log('Cuaca hari ini:', data.current.weather_descriptions[0])
  })
  .catch(error => console.error('Terjadi kesalahan:', error))