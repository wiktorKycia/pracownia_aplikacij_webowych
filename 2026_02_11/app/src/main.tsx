import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.scss'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
<StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App/>
            <ReactQueryDevtools client={queryClient} buttonPosition={"bottom-left"}/>
        </BrowserRouter>
    </QueryClientProvider>
</StrictMode>
)
