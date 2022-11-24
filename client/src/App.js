import './App.css';
import SignUp from './SignUp'
import SignIn from './SignIn'  
import Homepage from './Homepage'
import Comment from './Comment'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className='every-page-background-color'>
    <BrowserRouter>
      <Routes>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/signIn' element={<SignIn/>}></Route>
        <Route path='/homepage' element={<Homepage/>}></Route>
        <Route path='/comment' element={<Comment/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
