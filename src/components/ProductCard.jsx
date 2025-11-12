import { Link } from 'react-router-dom'

export default function ProductCard({ item }) {
  return (
    <Link to={`/product/${item.id}`} className="group block overflow-hidden rounded-xl border border-gray-100 bg-white hover:shadow-lg transition">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-500 capitalize">{item.brand} · {item.collection}</p>
        <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
      </div>
    </Link>
  )
}
