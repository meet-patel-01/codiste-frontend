import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { routeList } from './routes/index.route'

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(routeList)} />
    </>
  )
}
export default App
