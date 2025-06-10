'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, setSearchName } from './productsSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [delayPage,setDelayPage] = useState(1)
  const { items: products, status, error } = useSelector((state) => state.products);
  const searchName = useSelector((state)=> state.products.searchName)

  // این state برای ذخیره مقدار تایپ شده به صورت لحظه‌ای است
  const [searchInput, setSearchInput] = useState(searchName)

  // یک ref برای کنترل تایمر دیلی
  const debounceTimeout = useRef(null)

  // وقتی مقدار searchInput تغییر کرد، تایمر دیلی رو می‌زنیم
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(() => {
      // وقتی دیلی تموم شد مقدار سرچ واقعی رو ست می‌کنیم
      dispatch(setSearchName(searchInput))
      setPage(1)        // صفحه رو برمی‌گردونیم 1 چون سرچ عوض شده
      setDelayPage(1)
    }, 1000) // 500 میلی‌ثانیه دیلی

    // پاکسازی تایمر هنگام unmount یا تغییر بعدی
    return () => clearTimeout(debounceTimeout.current)
  }, [searchInput, dispatch])

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 20, searchName }))
  }, [dispatch, page, searchName])

  function searchPage(e){
   if (e !== page) {
      setPage(e)
      setDelayPage(e)
    }
  }

  if (status === 'loading') {
    return <p className="text-center text-gray-500 py-10">در حال بارگذاری محصولات...</p>
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500 py-10">خطا در بارگذاری: {error}</p>
  }

  return (
    <section className=" max-w-7xl mx-auto flex flex-col gap-10">
      {/* جستجو */}
      <div className="mb-6 flex justify-center">
        <Input
          placeholder="Searching..."
          value={searchInput}  // از searchInput استفاده می‌کنیم نه searchName
          onChange={(e) => setSearchInput(e.target.value)} // فقط مقدار local تغییر کنه، دیلی انجام می‌شه با useEffect بالا
          className="w-full max-w-2xl text-left rounded-xl shadow-md text-gray-950 font-mono"
        />
        {/* دکمه Search حالا غیرضروریه چون دیلی کار می‌کنه، می‌تونید حذف کنید یا همینطوری بذارید */}
        {/* <button onClick={()=>dispatch(setSearchName(searchInput))}>Search</button> */}
      </div>

      {/* محصولات */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 gap-7">
        {products.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">محصولی یافت نشد.</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              className="
              flex flex-col gap-2 
               sm:flex-col sm:gap-3 
               md:gap-0 md:flex-row items-stretch overflow-hidden rounded-tl-xl rounded-tr-xl shadow-lg border border-violet-900 bg-white hover:shadow-2xl transition-all duration-300 group space-x-5"
            >
              <div className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden relative">
                
                <Image
                  src={Array.isArray(product.images)
                    ? product.images[0]
                    : JSON.parse(product.images.replace(/'/g,'"'))[0]|| '/placeholder.jpg'
                  }
                  alt={product.name}
                  width={300}
                  height={300}
                  className="sm:w-full sm:h-auto w-full md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <div className="
               md:w-1/2 
               w-full p-6 flex flex-col justify-between
               bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200"
               >
                <h2 className="lg:text-2xl text-3xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                  {product.name}
                </h2>
                <p className="text-gray-900 font-mono text-md">
                  Price: {product.price?.toLocaleString('en-US')} usd
                </p>
                <Link href={`/products/${product.id}`} className='flex justify-center'>
                  <button className="
                  sm:px-35 sm:py-7
                  md:px-10 md:py-3
                  lg:px-8 lg:py-2
                  
                  cursor-pointer
                  rounded-sm
                  font-mono
                  text-gray-400 
                    bg-gradient-to-br from-slate-500 via-slate-100 to-slate-300
                    transition transform duration-600 hover:scale-110
                    ">
                    Details... 
                  </button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* صفحه‌بندی */}
      <div className="flex justify-center mt-4 gap-3">
        <button 
          className='bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition-colors duration-300'
          onClick={()=>searchPage(Number(delayPage))}
        >
          Search Page
        </button>
        <Button
          variant="outline"
          onClick={() => {
            setPage((p) => Math.max(p - 1, 1))
            setDelayPage(Number(delayPage) - 1)
          }}
          disabled={page === 1}
        >
          Before
        </Button>
        <input 
          
          value={delayPage}
          onChange={(e) => setDelayPage(Number(e.target.value))}
          className="w-14 text-2xl px-2 py-1 border border-violet-900 rounded text-center bg-gray-500"
        />
        <Button
          variant="outline"
          onClick={() => {
            setPage((p) => p + 1)
            setDelayPage(Number(delayPage) + 1)
          }}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
