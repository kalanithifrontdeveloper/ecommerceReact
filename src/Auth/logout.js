import React, { useEffect } from 'react';
import { logout } from '../AuthAPI/AuthService';

function Logout() {
    useEffect(() => {
        const performLogout = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await logout(token);
                } catch (err) {
                    console.error('Error logging out:', err);
                }
                localStorage.removeItem('token');
            }
            window.location.href = '/login'; // Redirect to login page
        };

        performLogout();
    }, []);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
}

export default Logout;
