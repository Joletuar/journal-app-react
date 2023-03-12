import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
    const { status } = useSelector((state) => state.auth);

    if (status === 'authenticated') {
        return <Navigate to='/*' />;
    }

    return (
        <div>
            <h2>Este es el AuthRoutes</h2>
            <Outlet />
        </div>
    );
};

export default AuthRoutes;
