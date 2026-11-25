import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import What from './pages/What'
import Why from './pages/Why'
import AppPage from './pages/AppPage'
import Ellar from './pages/Ellar'
import Vmn from './pages/Vmn'
import VmnHowPage from './pages/VmnHowPage'
import MapPage from './pages/MapPage'
import Products from './pages/Products'
import Contact from './pages/Contact'
import WaitlistPage from './pages/WaitlistPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/what" element={<What />} />
        <Route path="/why" element={<Why />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/ellar" element={<Ellar />} />
        <Route path="/vmn" element={<Vmn />} />
        <Route path="/vmn/how-it-works" element={<VmnHowPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
