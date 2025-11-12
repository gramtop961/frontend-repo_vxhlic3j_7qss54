import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Home(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    load(q)
  },[])

  const load = async (q) => {
    try{
      const url = new URL('/watches', getBackend())
      if (q) url.searchParams.set('q', q)
      const res = await fetch(url)
      const data = await res.json()
      if ((data.items || []).length === 0) {
        // Seed sample data then reload
        await fetch(`${getBackend()}/seed`, { method: 'POST' })
        const res2 = await fetch(url)
        const data2 = await res2.json()
        setItems(data2.items || [])
      } else {
        setItems(data.items || [])
      }
    }catch(e){
      console.error(e)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Watches</h2>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
