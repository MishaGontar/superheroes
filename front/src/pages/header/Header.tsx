import {Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {ThemeSwitcher} from "../../components/ThemeSwitcher.tsx";

const navbarItems = [
    {to: "/", label: "All superheroes"},
    {to: "/superheroes/create", label: "Create a Superhero"},
];

export default function Header() {
    return (
        <Navbar>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle/>
            </NavbarContent>
            <NavbarContent className="nav-content" justify="end">
                {navbarItems.map((item, i) => (
                    <NavbarItem key={item.to || i}>
                        <Link to={item.to} aria-current={item.to === "/" ? "page" : undefined}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="items-center">
                {navbarItems.map((item, i) => (
                    <NavbarMenuItem key={item.to || i}>
                        <Link to={item.to} aria-current={item.to === "/" ? "page" : undefined}>
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <NavbarMenuItem>
                    <ThemeSwitcher/>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
