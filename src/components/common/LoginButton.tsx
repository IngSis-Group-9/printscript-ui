import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";
import theme from "../../theme";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button
        onClick={() => loginWithRedirect()}
        variant="contained"
        sx={{
            width: "90%",
            color: 'black',
            display: 'flex',
            justifyContent: "center",
            backgroundColor: 'white',
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
            }
        }}
    >
        Log In
    </Button>;
};

export default LoginButton;