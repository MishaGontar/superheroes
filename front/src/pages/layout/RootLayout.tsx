import {Outlet} from "react-router-dom";
import Header from "../header/Header.tsx";

export default function RootLayout() {
    return (<>
        <Header/>
        <div className="flex-center">
            <Outlet/>
        </div>
    </>)
}