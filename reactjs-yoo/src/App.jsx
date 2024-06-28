import FirstPage from './pages/FirstPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import  { Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/HomePage' element={<HomePage/>}/>

    </Routes>
      
    </>
  )
}

export default App
