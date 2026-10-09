import { Routes, Route } from "react-router";
import Home from './Home';
import RecipeDetails from './RecipeDetails'

function App(){
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/recipes/:id" element={<RecipeDetails />}/>
    </Routes>
    </>
  )
}

export default App;