
import './App.css';
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom"
import Main from "./pages/main/main"
import Login from "./pages/login"
import Createpost from "./pages/create-post/Createpost"
import Navbar from './component/navbar';


function App() {
  return (
    <div className="App">
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/createpost' element={<Createpost/>}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
