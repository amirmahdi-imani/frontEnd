'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, addToCartIfLoggedIn, checkIfInCart } from './productDetailSlice'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/toast'

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { product, status, error, alreadyInCart } = useSelector((state) => state.productDetail)
  const [showImage, setShowImage] = useState(0)
  const {showToast} = useToast()

  useEffect(() => {
    if (id) dispatch(fetchProductById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      dispatch(checkIfInCart())
    }
  }, [product, dispatch])

  async function handleAddToCart() {
    const resultAction = await dispatch(addToCartIfLoggedIn())
    if (addToCartIfLoggedIn.rejected.match(resultAction)) {
      if (resultAction.payload === 'unauthenticated') {
        router.push('/auth/login')
      } else {
        showToast({
              title: '❌ خطا در افزودن به سبد خرید',
              description: resultAction.payload || resultAction.error?.message,
              duration: 5000,
              variant: 'error'
        });
  
      }
    } else {
      showToast({title:'Added to cart',variant:'success'})
      dispatch(checkIfInCart())
    }
  }

  if (status === 'loading') return <p className="text-center mt-10">در حال بارگذاری...</p>
  if (status === 'failed') return <p className="text-center mt-10 text-red-600">خطا: {error}</p>
  if (!product) return <p className="text-center mt-10 text-gray-600">محصولی یافت نشد.</p>

  function fixJsonString(str) {
    return str
      .replace(/([{,])\s*'([^']+?)'\s*:/g, '$1"$2":')
      .replace(/:\s*'([^']*?)'\s*([,}])/g, (match, val, tail) => {
        const escaped = val
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n')
        return `:"${escaped}"${tail}`
      })
      .replace(/'/g, '"')
  }

  let descriptionArray = []
  if (product.description) {
    try {
      const cleaned = fixJsonString(product.description)
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed)) {
        descriptionArray = parsed
      } else if (typeof parsed === 'object') {
        descriptionArray = [parsed]
      }
    } catch (err) {
      let cleanedString = product.description.replace(/,\s*{\s*'Size & Fit':\s*'.*?'}\s*/g, '')
      const cleaned = fixJsonString(cleanedString)
      const parsed = JSON.parse(cleaned)
      descriptionArray = parsed
    }
  }

  let images = []
  if (Array.isArray(product.images)) {
    images = product.images
  } else if (typeof product.images === 'string') {
    try {
      images = JSON.parse(product.images.replace(/'/g, '"'))
      if (!Array.isArray(images)) images = []
    } catch {
      images = []
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-1 space-y-5">
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-10 p-1 rounded-3xl shadow-xl border bg-white">
        {/* تصویر اصلی */}
        <div className="flex items-center justify-center">
          {images.length > 0 && (
            <Image
              src={images[showImage]}
              alt={product.name}
              width={700}
              height={400}
              className="object-contain max-w-full max-h-full"
            />
          )}
        </div>

        {/* جزئیات */}
        <div className="flex flex-col justify-between space-y-6 sm:space-y-4">
          <h1 className="text-4xl font-bold text-gray-700">{product.name}</h1>

          <div className="sm:text-xl text-sm font-mono text-gray-400 leading-relaxed">
            {descriptionArray.length > 0 ? (
              descriptionArray.map((item, index) => {
                const key = Object.keys(item)[0]
                const value = item[key]
                return (
                  <p key={index} className="mb-2">
                    <strong className="bg-gray-600 px-1 rounded">{key}:</strong> {value}
                  </p>
                )
              })
            ) : (
              <p className="text-gray-500">{product.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm mt-2">
            <span className="bg-gray-300 px-3 py-1 rounded-full text-gray-700">
              Color: <strong>{product.color}</strong>
            </span>
            <span className="bg-gray-300 px-3 py-1 rounded-full text-gray-700">
              Size: <strong>{product.size}</strong>
            </span>
            <span className="bg-gray-300 px-3 py-1 rounded-full text-gray-700">
              Product Code (SKU): <strong>{product.sku}</strong>
            </span>
          </div>

          <div className="mt-4 text-lg text-primary font-bold">
            <span className="bg-gray-700 text-white px-3 py-1 rounded">Price: {product.price?.toLocaleString()} USD</span>
          </div>

          <div className="mt-3 flex justify-center">
            <Button
              className={`
                cursor-pointer
                rounded-full sm:px-15 md:px-30 px-base-35 py-5 whitespace-nowrap transition ${
                alreadyInCart
                  ? 'bg-green-500/95 cursor-not-allowed'
                  : 'bg-rose-800 hover:bg-rose-900'
              }`}
              disabled={alreadyInCart}
              onClick={handleAddToCart}
            >
              <span className="text-lg">
                {alreadyInCart ? 'Already in Cart ' : 'Add to your cart'}
              </span>
            </Button>
          </div>
        </div>
      </Card>

      {/* گالری تصاویر */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border shadow hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setShowImage(index)}
          >
            <Image
              src={img}
              alt={`تصویر ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>

      {/* بخش نظرات */}
      <div className="bg-gray-600 text-left rounded-xl p-6 shadow space-y-4 text-white">
        <h2 className="text-xl font-bold border-b pb-2">Comments</h2>
        <div className="space-y-2 text-sm">
          <div className="border-b pb-2">
            <p className="font-semibold">User 1:</p>
            <p>.................</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-semibold">User 2:</p>
            <p>.....</p>
          </div>
        </div>
      </div>
    </section>
  )
}
