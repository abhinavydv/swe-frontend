import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SerachResults from './SearchResults'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home searchBar={true} />}/>
        <Route path='/search-result' element={<SerachResults searchBar={false} />}/>
      </Routes>
    </Router>
  )
}

export default App
