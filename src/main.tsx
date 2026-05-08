import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './index.css'

import DefaultLayout from './layouts/DefaultLayout.tsx'

import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProductsPage from './pages/ProductsPage.tsx'
import ProductDetailPage from './pages/ProductDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
