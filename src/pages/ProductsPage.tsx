import { useEffect, useState } from 'react'
import { getProducts, searchProducts, deleteProduct } from '../services/api'
import type { ProductListItem } from '../models/Product'
import { NavLink } from 'react-router'

import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import Loading from '../components/shared/Loading'

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
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Products</h1>
          <NavLink to="/products/add">
            <Button>+ Add</Button>
          </NavLink>
        </div>
        <div className="w-1/2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(0)
              setLoading(true)
            }}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
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
                    <NavLink to={`/products/${product.id}`}>
                      <Button variant="secondary">View</Button>
                    </NavLink>

                    <NavLink to={`/products/${product.id}/edit`}>
                      <Button variant="warning">Edit</Button>
                    </NavLink>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                disabled={page === 0}
                onClick={() => {
                  setPage(p => p - 1)
                  setLoading(true)
                }}
              >
                &lt;
              </Button>
              <span className="text-sm text-gray-600">
                {page + 1} / {totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={page >= totalPages - 1}
                onClick={() => {
                  setPage(p => p + 1)
                  setLoading(true)
                }}
              >
                &gt;
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
