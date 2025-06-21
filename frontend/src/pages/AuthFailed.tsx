import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthFailed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login after a short delay
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="auth-callback">
            <div className="auth-callback-container">
                <h2>Authentication Failed</h2>
                <p>Sorry, we couldn't authenticate you with Google. Please try again.</p>
                <p>Redirecting to login page...</p>
            </div>
        </div>
    );
};

export default AuthFailed;
