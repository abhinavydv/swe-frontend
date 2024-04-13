import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home searchBar={true} />}/>
        <Route path='/search' element={<SearchResults searchBar={true} />}/>
      </Routes>
    </Router>
  )
}

export default App
