import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const JournalRoutes = () => {
    const { status } = useSelector((state) => state.auth);

    if (status === 'not-authenticated') {
        return <Navigate to='/auth/*' />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default JournalRoutes;
