import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios, {AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';

const SNIPPET_MANAGER_API_URL = 'http://localhost:8083';

const RegisterScreen = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndRegisterUser = async () => {
            if (user) {
                try {
                    // Check if user is already registered in backend
                    await axios.get(`${SNIPPET_MANAGER_API_URL}/user/${user.sub}`);
                } catch (error) {
                    // If user is not registered, register them
                    const axiosError = error as AxiosError;
                    if (axiosError.response && axiosError.response.status === 404) {
                        await axios.post(`${SNIPPET_MANAGER_API_URL}/user/register`, {
                            id: user.sub,
                            name: user.name,
                            email: user.email
                        });
                    }
                }
                // await axios.post(`${SNIPPET_MANAGER_API_URL}/user/register`, {
                //     id: user.sub,
                //     name: user.name,
                //     email: user.email
                // });
            }
        };

        if (isAuthenticated) {
            checkAndRegisterUser();
        }
        
        navigate('/home');
    }, [isAuthenticated, user, navigate]);

    return (
        <div>
            Loading...
        </div>
    );
};

export default RegisterScreen;