import axios from "axios";



const API_KEY = '065824fc1863514d762a2b007fc95c22';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


export const fetchWeatherByCity = async(city) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'fa'
        }
    })
    return response.data
}