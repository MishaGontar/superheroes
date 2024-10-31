import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SuperHeroDetails, {loadSuperHeroById} from "./pages/superhero-details/SuperHeroDetails.tsx";
import CreateSuperHero from "./pages/superhero-create/CreateSuperHero.tsx";
import SuperHeroEdit from "./pages/superhero-edit/SuperHeroEdit.tsx";

const routers = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/superheroes/create',
                element: <CreateSuperHero/>
            },
            {
                path: '/superhero/:id',
                element: <SuperHeroDetails/>,
                loader: loadSuperHeroById
            },
            {
                path: '/superhero/edit/:id',
                element: <SuperHeroEdit/>,
                loader: loadSuperHeroById
            }
        ]
    }
])

function App() {
    return <RouterProvider router={routers}/>
}

export default App
