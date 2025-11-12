import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 14 } }
}

export default function Hero() {
  return (
    <section className="relative">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Timepieces that Define You</motion.h1>
          <motion.p variants={item} className="mt-4 text-gray-600">Discover precision, craftsmanship, and style across our curated collections of chronographs, dress watches, and sports models.</motion.p>
          <motion.div variants={item} className="mt-6 flex gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/collections/chronograph" className="inline-flex items-center px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700">Shop Chronograph</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/collections/dress" className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50">Shop Dress</Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          variants={item}
          className="rounded-2xl overflow-hidden shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <motion.img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1600&auto=format&fit=crop"
            alt="Hero Watch"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
