import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.removeItem('authAccessToken'); // remove authAccessToken from localStorage
    };

    return (
        <Button
            onClick={handleLogout}
            sx={{
                my: 2,
                paddingLeft: 2,
                paddingRight: 2,
                color: 'primary',
                display: 'flex',
                justifyContent: "center",
                backgroundColor: 'white',
                gap: "4px",
                "&:hover": {
                    backgroundColor: 'white'
                }
            }}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;