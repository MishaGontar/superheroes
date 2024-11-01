import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {ThemeSwitcher} from "../components/ThemeSwitcher.tsx";

export default function Header() {
    return (
        <Navbar>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Link to="/" aria-current="page">
                        All superheroes
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" to="/superheroes/create">
                        Create a Superhero
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}