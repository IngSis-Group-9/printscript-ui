import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios, {AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';

const SNIPPET_MANAGER_API_URL = 'https://nueve-de-diciembre.duckdns.org';

const RegisterScreen = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndRegisterUser = async () => {
            if (user) {
                let token = localStorage.getItem('authAccessToken');
                // Wait until token is available
                while (!token) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    token = localStorage.getItem('authAccessToken');
                }
                try {
                    // Check if user is already registered in backend
                    await axios.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/user/${user.sub}`, {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                    await axios.get(`https://nueve-de-diciembre.duckdns.org/snippet-manager/snippets/test`, {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                } catch (error) {
                    // If user is not registered, register them
                    const axiosError = error as AxiosError;
                    if (axiosError.response && axiosError.response.status === 404) {
                        await axios.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/user/register`, null,
                        {
                            headers: { 'Authorization': 'Bearer ' + token }
                        });
                    }
                }
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