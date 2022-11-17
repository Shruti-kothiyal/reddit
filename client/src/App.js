import './App.css';
import SignUp from './SignUp'
import SignIn from './SignIn'  
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/signIn' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
