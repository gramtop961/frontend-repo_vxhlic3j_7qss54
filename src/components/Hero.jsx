import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Timepieces that Define You</h1>
          <p className="mt-4 text-gray-600">Discover precision, craftsmanship, and style across our curated collections of chronographs, dress watches, and sports models.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/collections/chronograph" className="inline-flex items-center px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700">Shop Chronograph</Link>
            <Link to="/collections/dress" className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50">Shop Dress</Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1600&auto=format&fit=crop" alt="Hero Watch" />
        </div>
      </div>
    </section>
  )
}
