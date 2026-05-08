export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  images: string[]
}

export type ProductListItem = {
  id: Product['id']
  title: Product['title']
  price: Product['price']
  category: Product['category']
  brand: Product['brand']
  thumbnail: Product['thumbnail']
}

export interface ProductsResponse {
  products: ProductListItem[]
  total: number
  skip: number
  limit: number
}

export interface ProductFormData {
  title: string
  description: string
  price: number
  discountPercentage: number
  category: string
  brand: string
}
