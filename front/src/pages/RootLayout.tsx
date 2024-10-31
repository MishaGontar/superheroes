import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";

export default function RootLayout() {
    return (<>
        <Header/>
        <div className="flex-center">
            <Outlet/>
        </div>
    </>)
}