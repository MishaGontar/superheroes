import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import {loadSuperHeroById} from "./pages/superhero-details/SuperheroDetails.tsx";
import {lazy, Suspense} from "react";
import CustomSpinner from "./components/spinner/Spinner.tsx";
import {loadSuperheroList} from "./pages/superhero-list/SuperheroList.tsx";

const SuperheroDetails = lazy(() => import("./pages/superhero-details/SuperheroDetails.tsx"));
const CreateSuperhero = lazy(() => import("./pages/superhero-create/SuperheroCreate.tsx"));
const SuperheroEdit = lazy(() => import("./pages/superhero-edit/SuperheroEdit.tsx"));
const SuperheroList = lazy(() => import("./pages/superhero-list/SuperheroList.tsx"));
const ErrorPage = lazy(() => import("./pages/errors/ErrorPage.tsx"));
const UnexpectedError = lazy(() => import("./pages/errors/UnexpectedError.tsx"));

const routers = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <SuperheroList/>,
                loader: () => loadSuperheroList(),
                errorElement: <UnexpectedError/>
            },
            {
                path: '/superheroes/create',
                element: <CreateSuperhero/>
            },
            {
                path: '/superhero/:id',
                element: <SuperheroDetails/>,
                loader: loadSuperHeroById,
                errorElement: <UnexpectedError/>
            },
            {
                path: '/superhero/edit/:id',
                element: <SuperheroEdit/>,
                loader: loadSuperHeroById,
                errorElement: <UnexpectedError/>
            }
        ]
    }
])

function App() {
    return <Suspense fallback={<CustomSpinner/>}>
        <RouterProvider router={routers}/>
    </Suspense>
}

export default App
