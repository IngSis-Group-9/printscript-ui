import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import HomeScreen from "./screens/Home.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import RulesScreen from "./screens/Rules.tsx";
import PrivateRoute from "./utils/privateRoute.tsx";
import LandingScreen from "./screens/Landing.tsx";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingScreen />
    },
    {
        path: "/home",
        element: (
            <PrivateRoute>
                <HomeScreen />
            </PrivateRoute>
        )
    },
    {
        path: '/rules',
        element: (
            <PrivateRoute>
                <RulesScreen/>
            </PrivateRoute>
        )
    }
]);

export const queryClient = new QueryClient()
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
