import { useActionState, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  addProduct,
  getCategoryList,
  getProductsById,
  updateProduct,
} from '../services/api'
import type { Product } from '../models/Product'

function ProductFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = !!id

  const [categories, setCategories] = useState<string[]>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(isEdit)

  const [error, submitAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        const data = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          price: Number(formData.get('price')),
          discountPercentage: Number(formData.get('discountPercentage')),
          category: formData.get('category') as string,
          brand: formData.get('brand') as string,
        }

        if (isEdit) {
          await updateProduct(Number(id), data)
        } else {
          await addProduct(data)
        }

        navigate('/products')
        return null
      } catch (err) {
        if (err instanceof Error) return err.message
        return 'Failed to save product'
      }
    },
    null
  )

  useEffect(() => {
    async function fetchData() {
      const catList = await getCategoryList()
      setCategories(catList)

      if (isEdit) {
        const existingProduct = await getProductsById(Number(id))
        if (existingProduct) {
          setProduct(existingProduct)
        } else {
          navigate('/products')
        }
      }

      setLoading(false)
    }
    fetchData()
  }, [id, isEdit, navigate])

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <div className="space-y-2">
      <button
        className="px-2 py-1 rounded border border-cyan-500 text-cyan-500"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1 className="text-2xl">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-4 max-w-lg" action={submitAction}>
        <div className="space-y-1">
          <label className="block" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border p-2 rounded"
            defaultValue={product?.title || ''}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full border p-2 rounded"
            rows={3}
            defaultValue={product?.description || ''}
          />
        </div>

        <div className="flex gap-4">
          <div className="space-y-1 flex-1">
            <label className="block" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="w-full border p-2 rounded"
              defaultValue={product?.price ?? 10}
              min={0}
              step={0.01}
              required
            />
          </div>
          <div className="space-y-1 flex-1">
            <label className="block" htmlFor="discountPercentage">
              Discount %
            </label>
            <input
              type="number"
              name="discountPercentage"
              id="discountPercentage"
              className="w-full border p-2 rounded"
              defaultValue={product?.discountPercentage ?? 0}
              min={0}
              max={100}
              step={0.01}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="space-y-1 flex-1">
            <label className="block" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-full border p-2 rounded"
              defaultValue={product?.category || ''}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 flex-1">
            <label className="block" htmlFor="brand">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="w-full border p-2 rounded"
              defaultValue={product?.brand || ''}
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-cyan-500 text-white disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}

export default ProductFormPage
