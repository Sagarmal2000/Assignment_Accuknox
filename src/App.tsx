import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Root from "./root";
import Home from "./pages/homePage";
import Dasboard from "./pages/dasboard";


const router=createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:"/dasboard",
        element:<Dasboard />
      }
    ]
  
}])

function App(){
  return <RouterProvider router={router}></RouterProvider>
}

export default App