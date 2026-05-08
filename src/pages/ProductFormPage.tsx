import { useActionState, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { addProduct, getCategoryList } from '../services/api'

function ProductFormPage() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState<string[]>([])

  const [error, submitAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        await addProduct({
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          price: Number(formData.get('price')),
          discountPercentage: Number(formData.get('discountPercentage')),
          category: formData.get('category') as string,
          brand: formData.get('brand') as string,
        })
        navigate('/products')
        return null
      } catch (err) {
        if (err instanceof Error) return err.message
        return 'Failed to create product'
      }
    },
    null
  )

  useEffect(() => {
    async function getList() {
      const cat = await getCategoryList()
      setCategories(cat)
    }
    getList()
  }, [])

  return (
    <div className="space-y-4">
      <button
        className="px-2 py-1 rounded border border-cyan-500 text-cyan-500"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1 className="text-2xl">Add Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-2 max-w-lg" action={submitAction}>
        <div className="space-y-1">
          <label className="block" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows={3}
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
              className="w-full border p-2 rounded"
              defaultValue={10}
              min={0}
              step={0.1}
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
              className="w-full border p-2 rounded"
              defaultValue={0}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="space-y-1 flex-1">
            <label className="block" htmlFor="category">
              Category
            </label>
            <select name="category" className="w-full border p-2 rounded">
              <option value="">Select category</option>
              {categories &&
                categories.map(cat => (
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
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-cyan-500 text-white disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default ProductFormPage
