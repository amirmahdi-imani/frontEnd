import axios from "axios";

const API_KEY = '4e803877a36d5e70932c861c50b76a94';
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';



export const fetchNews = async(country) => {
    const response = await axios.get(BASE_URL, {
        params: {
            country,
            apikey: API_KEY
        }
    })
    return response.data.articles;

}