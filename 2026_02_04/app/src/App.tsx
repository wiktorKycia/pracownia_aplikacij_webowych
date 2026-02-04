import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Posts from './pages/Posts'
import Categories from './pages/Categories'
import Home from './pages/Home'
import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/posts' element={<Posts/>} />
                <Route path='/categories' element={<Categories/>} />
            </Routes>
            <Footer/>
        </>
    )
}

export default App
