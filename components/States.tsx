import { useEffect, useRef, useState } from 'react'

const STATS = [
    { label: 'Wallets Scanned', value: 10000 },
    { label: 'Scams Detected', value: 1300 },
    { label: 'Active Users', value: 1000 },
]

export default function StatsSection() {
    const refs = useRef<(HTMLDivElement | null)[]>([])
    const [visible, setVisible] = useState(STATS.map(() => false))

    // IntersectionObserver to detect when in viewport center
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute('data-index'))
                    if (entry.isIntersecting) {
                        setVisible((prev) => {
                            const updated = [...prev]
                            updated[index] = true
                            return updated
                        })
                    }
                })
            },
            { threshold: 0.5 } // trigger when element is 50% in viewport
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
                        className={`text-6xl md:text-8xl font-bold transition-transform duration-700 ease-out transform ${visible[index] ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' }} // spring-like effect
                    >
                        {stat.value.toLocaleString()}+
                    </div>
                    <div className="text-xl md:text-2xl mt-4 text-gray-400">{stat.label}</div>
                </div>
            ))}
        </section>
    )
}
