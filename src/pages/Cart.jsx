import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Cart(){
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ load() },[])

  const load = async () => {
    try{
      const cart_id = localStorage.getItem('cart_id')
      if(!cart_id){ setItems([]); setTotal(0); setLoading(false); return }
      const res = await fetch(`${getBackend()}/cart/${cart_id}`)
      const data = await res.json()
      setItems(data.items || [])
      setTotal(data.total || 0)
    }catch(e){ console.error(e) }
    finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : items.length ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map(i => (
                <div key={i.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                  <img src={i.image_snapshot} alt={i.title_snapshot} className="h-20 w-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-medium">{i.title_snapshot}</h3>
                    <p className="text-sm text-gray-500">Qty {i.quantity}</p>
                  </div>
                  <div className="font-semibold">${(i.price_snapshot * i.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <aside className="p-4 border border-gray-100 rounded-xl h-fit">
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700">Checkout</button>
            </aside>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}
