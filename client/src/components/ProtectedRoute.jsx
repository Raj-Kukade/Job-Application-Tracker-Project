import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate to="/" />; //if login true - dashboard (outlet) , if false  then '/' login page 
}

export default ProtectedRoute;