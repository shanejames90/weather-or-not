let apiUrl
const apiUrls = {
  production: 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=05ec2068db810b286efb4be98ee0bbf9&zip=',
  development: 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=05ec2068db810b286efb4be98ee0bbf9&zip='
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
