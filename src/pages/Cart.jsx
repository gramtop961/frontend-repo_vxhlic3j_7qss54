import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Cart(){
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

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

  const payDemo = async () => {
    try{
      const cart_id = localStorage.getItem('cart_id')
      const res = await fetch(`${getBackend()}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id, email })
      })
      const data = await res.json()
      if (data.status === 'paid'){
        setStatus(`Payment successful! Order #${data.order_id}`)
        // clear local cart id to simulate new session
        localStorage.removeItem('cart_id')
      } else {
        setStatus('Payment failed')
      }
    } catch(e){
      setStatus('Payment failed')
    }
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
              <AnimatePresence initial={false}>
                {items.map(i => (
                  <motion.div
                    key={i.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <img src={i.image_snapshot} alt={i.title_snapshot} className="h-20 w-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-medium">{i.title_snapshot}</h3>
                      <p className="text-sm text-gray-500">Qty {i.quantity}</p>
                    </div>
                    <div className="font-semibold">${(i.price_snapshot * i.quantity).toFixed(2)}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.aside className="p-4 border border-gray-100 rounded-xl h-fit space-y-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-semibold">Summary</h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <input type="email" placeholder="Email (for receipt)" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border-gray-300" />
              <motion.button onClick={payDemo} className="w-full px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700" whileTap={{ scale: 0.96 }}>
                Pay (Demo)
              </motion.button>
              <AnimatePresence>
                {status && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-green-600">{status}</motion.p>
                )}
              </AnimatePresence>
            </motion.aside>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}
