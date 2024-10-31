import {useTheme} from "next-themes";
import {Switch} from "@nextui-org/react";
import SunIcon from "../assets/SunIcon.tsx";
import MoonIcon from "../assets/MoonIcon.tsx";

export function ThemeSwitcher() {
    const {theme, setTheme} = useTheme()

    return (
        <Switch
            isSelected={theme === 'dark'}
            color="warning"
            onChange={(): void => setTheme(theme === 'light' ? 'dark' : 'light')}
            thumbIcon={({isSelected}) => isSelected ? <SunIcon/> : <MoonIcon/>}
        >
            {theme} mode
        </Switch>
    )
}