import type { Product, ProductFormData, ProductsResponse } from '../models/Product'
import type { User } from '../models/User'

const BASE_URL = '/api'

export async function postAuthLogin(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })
  const json = await response.json()
  return json as User
}

export async function getProducts(limit: number = 10, skip: number = 0) {
  const select = 'title,price,category,brand,thumbnail'
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}&select=${select}`
  )
  const json = await response.json()
  return json as ProductsResponse
}

export async function searchProducts(
  query: string,
  limit: number = 10,
  skip: number = 0
) {
  const select = 'title,price,category,brand,thumbnail'
  const response = await fetch(
    `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}&select=${select}`
  )
  const json = await response.json()
  return json as ProductsResponse
}

export async function getProductsById(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  const json = await response.json()
  return json as Product
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  })
  const json = await response.json()
  return json as Product & { isDeleted: boolean; deletedOn: string }
}

export async function addProduct(data: ProductFormData) {
  const response = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await response.json()
  return json as Product
}

export async function getCategoryList() {
  const response = await fetch(`${BASE_URL}/products/category-list`)
  const json = await response.json()
  return json as string[]
}

export async function updateProduct(id: number, data: ProductFormData) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await response.json()
  return json as Product
}
