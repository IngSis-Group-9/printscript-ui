import backgroundImage from '../assets/background-1.jpeg';
import {Box} from "@mui/material";
import LoginButton from "../components/common/LoginButton.tsx";
import RegisterButton from "../components/common/RegisterButton.tsx";
import Divider from "../components/common/Divider.tsx";

const LandingScreen = () => {

    return (
        <div
            style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            >
                <Box
                    sx = {{
                        width: '350px',
                        marginTop: '-400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'start',
                        gap: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        padding: 2,
                        borderRadius: 1,
                    }}
                >
                    <h1
                        style = {{
                            color: 'white',
                            fontSize: '70px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >𝙿𝚛𝚒𝚗𝚝𝚜𝚌𝚛𝚒𝚙𝚝</h1>
                    <LoginButton />
                    <Divider text={"or"} />
                    <RegisterButton/>
                </Box>
            </div>
        </div>
    )
}

export default LandingScreen;