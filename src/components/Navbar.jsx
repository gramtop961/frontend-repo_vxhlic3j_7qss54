import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ShoppingCart, Watch, Search } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getBackend = () => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Navbar() {
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)
  const [q, setQ] = useState('')

  useEffect(() => {
    const id = ensureCartId()
    updateCount(id)
    const i = setInterval(() => updateCount(id), 4000)
    return () => clearInterval(i)
  }, [])

  const ensureCartId = () => {
    let cid = localStorage.getItem('cart_id')
    if (!cid) {
      cid = crypto.randomUUID()
      localStorage.setItem('cart_id', cid)
    }
    return cid
  }

  const updateCount = async (cid) => {
    try {
      const res = await fetch(`${getBackend()}/cart/${cid}`)
      const data = await res.json()
      setCartCount((data.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0))
    } catch (e) {
      // ignore
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <Watch className="h-6 w-6 text-indigo-600" />
          <span>Chronos</span>
        </Link>

        <nav className="ml-6 hidden sm:flex items-center gap-4 text-sm text-gray-600">
          <NavLink to="/collections/chronograph" className={({isActive})=>classNames('hover:text-gray-900', isActive && 'text-gray-900 font-medium')}>Chronograph</NavLink>
          <NavLink to="/collections/dress" className={({isActive})=>classNames('hover:text-gray-900', isActive && 'text-gray-900 font-medium')}>Dress</NavLink>
          <NavLink to="/collections/sport" className={({isActive})=>classNames('hover:text-gray-900', isActive && 'text-gray-900 font-medium')}>Sport</NavLink>
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
          <Search className="h-4 w-4 text-gray-500" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search watches" className="bg-transparent outline-none text-sm w-56" />
        </form>

        <Link to="/cart" className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100">
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center px-1">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  )
}
