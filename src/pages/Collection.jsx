import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Collection(){
  const { handle } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    load()
  },[handle])

  const load = async () => {
    try{
      const url = new URL('/watches', getBackend())
      url.searchParams.set('collection', handle)
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.items || [])
    }catch(e){
      console.error(e)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold capitalize mb-6">{handle} Collection</motion.h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          items.length ? (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(item => (
                <ProductCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )
        )}
      </section>

      <Footer />
    </div>
  )
}
