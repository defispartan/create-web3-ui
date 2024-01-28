import './display/styles/App.css'
import React, { Suspense } from 'react'
import Header from './display/Header.tsx'

// lazy load routes
const Home = React.lazy(() => import('./pages/Home.tsx'))

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="spinner" />}>
        <Home />
      </Suspense>
    </>
  )
}
