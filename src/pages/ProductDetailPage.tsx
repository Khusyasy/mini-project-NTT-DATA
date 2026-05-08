import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getProductsById } from '../services/api'
import type { Product } from '../models/Product'
import Loading from '../components/shared/Loading'
import Button from '../components/shared/Button'

function ProductDetailPage() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        const data = await getProductsById(Number(id))
        setProduct(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <Loading />
  if (!product) return <div>Product not found</div>

  const isDiscounted = product.discountPercentage > 0
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2)

  return (
    <div className="space-y-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>

      <div className="space-y-4">
        <div className="flex flex-row items-center justify-start w-full gap-4 overflow-x-auto">
          {product.images &&
            product.images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={product.title}
                className="w-64 h-64 object-cover rounded"
              />
            ))}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-gray-600">{product.description}</div>
          <div className="text-xl font-semibold space-x-2">
            {isDiscounted ? (
              <>
                <span>${discountedPrice}</span>
                <span className="line-through text-gray-500">
                  ${product.price}
                </span>
                <span className="text-gray-500">
                  ({product.discountPercentage}% off)
                </span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
          <div>Category: {product.category}</div>
          <div>Brand: {product.brand}</div>
          <div>Stock: {product.stock}</div>
          <div>Rating: {product.rating} / 5</div>
          <div className="flex items-center gap-2">
            Tags:
            <div className="flex gap-2">
              {product.tags &&
                product.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded bg-cyan-100">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
