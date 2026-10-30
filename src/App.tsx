import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <Hero />
      </main>
    </div>
  )
}

export default App