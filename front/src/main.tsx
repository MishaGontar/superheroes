import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {NextUIProvider} from "@nextui-org/react";
import axios from "axios";
import {ThemeProvider as NextThemesProvider} from "next-themes";

axios.defaults.baseURL = import.meta.env.VITE_BACK_URL

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <App/>
            </NextThemesProvider>
        </NextUIProvider>
    </StrictMode>
)
