import { useActionState, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  addProduct,
  getCategoryList,
  getProductsById,
  updateProduct,
} from '../services/api'
import type { Product } from '../models/Product'

import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import Loading from '../components/shared/Loading'
import TextArea from '../components/shared/TextArea'
import Select from '../components/shared/Select'

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

  if (loading) return <Loading />

  return (
    <div className="space-y-2">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>

      <h1 className="text-2xl">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-4 max-w-lg" action={submitAction}>
        <Input
          label="Title"
          name="title"
          id="title"
          defaultValue={product?.title || ''}
          required
        />

        <TextArea
          label="Description"
          name="description"
          id="description"
          rows={3}
          defaultValue={product?.description || ''}
        />

        <div className="flex gap-4">
          <Input
            label="Price"
            type="number"
            name="price"
            id="price"
            defaultValue={product?.price ?? 10}
            min={0}
            step={0.01}
            required
          />
          <Input
            label="Discount %"
            type="number"
            name="discountPercentage"
            id="discountPercentage"
            defaultValue={product?.discountPercentage ?? 0}
            min={0}
            max={100}
            step={0.01}
          />
        </div>

        <div className="flex gap-4">
          <Select
            label="Category"
            name="category"
            id="category"
            defaultValue={product?.category || ''}
          >
            <option value="">Select category</option>
            {categories &&
              categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </Select>
          <Input
            label="Brand"
            type="text"
            name="brand"
            id="brand"
            defaultValue={product?.brand || ''}
          />
        </div>

        <Button type="submit" isLoading={isPending}>
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </div>
  )
}

export default ProductFormPage
