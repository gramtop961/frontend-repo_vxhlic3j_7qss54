import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCard({ item }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ type: 'spring', stiffness: 90, damping: 14 }}>
      <Link to={`/product/${item.id}`} className="group block overflow-hidden rounded-xl border border-gray-100 bg-white hover:shadow-lg transition">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <motion.img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" whileHover={{ scale: 1.03 }} />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
          <p className="text-sm text-gray-500 capitalize">{item.brand} · {item.collection}</p>
          <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
        </div>
      </Link>
    </motion.div>
  )
}
