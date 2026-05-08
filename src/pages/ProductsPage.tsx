import { useEffect, useState } from 'react'
import { getProducts, searchProducts, deleteProduct } from '../services/api'
import type { ProductListItem } from '../models/Product'
import { NavLink } from 'react-router'

function ProductsPage() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const limit = 10

  useEffect(() => {
    async function fetchData() {
      try {
        if (search !== '') {
          const data = await searchProducts(search, limit, page * limit)
          setProducts(data.products)
          setTotal(data.total)
        } else {
          const data = await getProducts(limit, page * limit)
          setProducts(data.products)
          setTotal(data.total)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, search])

  const totalPages = Math.ceil(total / limit)

  const handleDelete = async (product: ProductListItem) => {
    if (!window.confirm(`Delete "${product.title}"?`)) return

    try {
      await deleteProduct(product.id)
      setProducts(products => products.filter(p => p.id !== product.id))
      setTotal(total => total - 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl">Products</h1>
          <NavLink
            to="/products/add"
            className="px-2 py-1 rounded bg-cyan-500 text-white"
          >
            + Add
          </NavLink>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(0)
            setLoading(true)
          }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-cyan-50 text-left">
                <th className="p-2 border">Thumbnail</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Brand</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-2 border">{product.title}</td>
                  <td className="p-2 border">{product.brand}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">${product.price}</td>
                  <td className="p-2 border space-x-2">
                    <NavLink
                      to={`/products/${product.id}`}
                      className="px-2 py-1 rounded bg-cyan-500 text-white"
                    >
                      View
                    </NavLink>

                    <NavLink
                      to={`/products/${product.id}/edit`}
                      className="px-2 py-1 rounded bg-amber-500 text-white"
                    >
                      Edit
                    </NavLink>

                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 rounded border border-cyan-500 text-cyan-500"
                disabled={page === 0}
                onClick={() => {
                  setPage(p => p - 1)
                  setLoading(true)
                }}
              >
                &lt;
              </button>
              <span>
                {page + 1} / {totalPages}
              </span>
              <button
                className="px-2 py-1 rounded border border-cyan-500 text-cyan-500"
                disabled={page >= totalPages - 1}
                onClick={() => {
                  setPage(p => p + 1)
                  setLoading(true)
                }}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
