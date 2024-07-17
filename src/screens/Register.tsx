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
                let token = localStorage.getItem('authAccessToken');
                // Wait until token is available
                while (!token) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    token = localStorage.getItem('authAccessToken');
                }
                try {
                    // Check if user is already registered in backend
                    await axios.get(`${SNIPPET_MANAGER_API_URL}/user/${user.sub}`, {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                } catch (error) {
                    // If user is not registered, register them
                    const axiosError = error as AxiosError;
                    if (axiosError.response && axiosError.response.status === 404) {
                        await axios.post(`${SNIPPET_MANAGER_API_URL}/user/register`, null,
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