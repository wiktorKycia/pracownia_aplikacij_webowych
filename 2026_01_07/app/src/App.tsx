import styles from './App.module.scss'
import Navbar from './components/Navbar/Navbar.tsx'

function App() {
  return (
    <>
      <Navbar/>
        <h1 className={styles.Heading}>Strona główna</h1>
    </>
  )
}

export default App
