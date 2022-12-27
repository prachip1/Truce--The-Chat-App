import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/login' />  // checking if user is not logged in then navigate them to Login page
    }

    return children
  }

  return (
  <BrowserRouter>
    <Routes>
     <Route path="/">

       <Route index element=
       {
        <ProtectedRoute> {/* these all are done to redirect the null user or not logged in user to log in page */}
          <Home />
        </ProtectedRoute>
       } 
       />

       <Route path="login" element={<Login />} />
       <Route path="register" element={<Register/>} />
     </Route>
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
