import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Posts from './pages/Posts'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Post from './pages/Post'
import User from './pages/User'
import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/posts'>
                    <Route index element={<Posts/>}/>
                    <Route path=":id" element={<Post/>}/>
                </Route>

                <Route path='/categories' element={<Categories/>} />

                <Route path='/users'>
                    <Route path=':id' element={<User/>}/>
                </Route>
            </Routes>
            <Footer/>
        </>
    )
}

export default App
