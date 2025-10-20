import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Wallets Scanned', value: 10000 },
  { label: 'Scams Detected', value: 1300 },
  { label: 'Active Users', value: 1000 },
]

export default function StatsSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState(STATS.map(() => false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          setVisible((prev) => {
            const updated = [...prev]
            updated[index] = entry.isIntersecting // true when visible, false when not
            return updated
          })
        })
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    )

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref!)
      })
    }
  }, [])

  return (
    <section className="w-full">
      {STATS.map((stat, index) => (
        <div
          key={index}
          ref={(el) => { refs.current[index] = el }}
          data-index={index}
          className="h-screen flex flex-col justify-center items-center text-white"
        >
          <div
            className={`text-6xl md:text-8xl font-bold transition-transform duration-700 ease-out transform ${
              visible[index]
                ? 'scale-100 opacity-100'
                : 'scale-75 opacity-0'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
            }}
          >
            {stat.value.toLocaleString()}+
          </div>
          <div className="text-xl md:text-2xl mt-4 text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}
