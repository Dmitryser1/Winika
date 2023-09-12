import './App.css';
import Home from './page/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }
])


function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
