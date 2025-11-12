import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Product(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(()=>{ load() },[id])

  const load = async () => {
    try{
      const res = await fetch(`${getBackend()}/watches/${id}`)
      const data = await res.json()
      setItem(data)
    }catch(e){
      console.error(e)
    }finally{ setLoading(false) }
  }

  const addToCart = async () => {
    try{
      let cart_id = localStorage.getItem('cart_id')
      if(!cart_id){ cart_id = crypto.randomUUID(); localStorage.setItem('cart_id', cart_id) }
      await fetch(`${getBackend()}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id, product_id: id, quantity: qty })
      })
      setAdded(true)
      setTimeout(()=>setAdded(false), 2000)
    }catch(e){ console.error(e) }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : item ? (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(item.images || []).map((img, idx)=> (
                  <img key={idx} src={img} alt="thumb" className="h-20 w-full object-cover rounded-md" />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <p className="text-gray-500 capitalize">{item.brand} · {item.collection}</p>
              <div className="mt-4 text-2xl font-semibold">${item.price?.toFixed(2)}</div>
              <p className="mt-4 text-gray-600">{item.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <label className="text-sm text-gray-600">Qty</label>
                <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="w-20 rounded-md border-gray-300" />
                <button onClick={addToCart} className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700">Add to cart</button>
                {added && <span className="text-sm text-green-600">Added!</span>}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Product not found.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}
