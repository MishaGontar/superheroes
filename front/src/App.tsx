import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import SuperheroForm from "./pages/superhero-create/SuperheroForm.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";


const routers = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/superheroes/create',
                element: <SuperheroForm/>
            }
        ]
    }
])

function App() {
    return <RouterProvider router={routers}/>
}

export default App
