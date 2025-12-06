import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// Import React Router
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// Import route components
import Home from './routes/Home.jsx'
import Events from './routes/Events.jsx'
import Category from './routes/Category.jsx'
import Details from './routes/Details.jsx'
import Purchase from './routes/Purchase.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/events/:category" element={<Category />}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/purchase/:id" element={<Purchase />}/>
      </Routes>
    </Router>
  </StrictMode>
)
