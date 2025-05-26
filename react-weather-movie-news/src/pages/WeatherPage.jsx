import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import {getWeather} from '../features/weather/weatherSlice'
import { useEffect,useState } from "react";








const WeatherPage= ()=>{
    const dispatch = useDispatch();
    const {data, status, error} = useSelector((state)=>state.weather)
    const [city, setCity] = useState('Tehran');

    useEffect(()=>{
        dispatch(getWeather(city));
        
        
    },[dispatch,city])

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(getWeather(city))
        
    }




    return(
        <Layout title='Weather'>
            <main className="flex items-center justify-center flex-col p-20">

                <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Weather</h1>
                <form onSubmit={handleSubmit} className="mb-6 w-full max-w-sm flex">
                  <input
                     type="text"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     placeholder="نام شهر را وارد کنید"
                     className="flex-grow p-2 rounded-l-md border border-gray-300 focus:outline-none"
                   />
                  <button
                      type="submit"
                      className="bg-indigo-700 text-white px-4 rounded-r-md hover:bg-indigo-900 transition"
                      >
                       جستجو
                   </button>
                 </form>

                 {status === "loading" && <p className="text-white">در حال بارگذاری...</p>}
                 {status === "failed" && <p className="text-red-300">{error}</p>}
                 {status === "succeeded" && data && (
                          <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow-lg w-full max-w-sm text-center">
                          <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
                          <p className="text-lg mb-1">دمای فعلی: {data.main.temp}°C</p>
                          <p className="capitalize mb-2">{data.weather[0].description}</p>
                          <img
                               alt={data.weather[0].description}
                               src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                               className="mx-auto"
                               />
                          <p>رطوبت: {data.main.humidity}%</p>
                          <p>سرعت باد: {data.wind.speed} متر بر ثانیه</p>
                          
                      </div>
                 )}


            </main>
        </Layout>
    )

}



export default WeatherPage;