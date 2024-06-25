import {ComponentType} from "react";
import {Navbar} from "./Navbar.tsx";
import {Box} from "@mui/material";
import backgroundImage from "../../assets/background-1.jpeg";

export const withNavbar = (WrappedComponent: ComponentType<unknown>) => {
    return () => (
        <>
            <div
                style={{
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Navbar/>
                <Box padding={"16px 128px"}>
                    <WrappedComponent/>
                </Box>
            </div>
        </>
    );
};
