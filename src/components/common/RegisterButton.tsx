import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";
import theme from "../../theme.ts";

const RegisterButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button
        onClick={() => loginWithRedirect()}
        variant="outlined"
        color="secondary"
        sx={{
            width: "90%",
            color: 'white',
            display: 'flex',
            justifyContent: "center",
            border: '1px solid',
            "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: '#464646'
            }
        }}
    >
        Register
    </Button>;
};

export default RegisterButton;