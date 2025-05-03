import { Navigate, Outlet } from 'react-router-dom';
import useTokenStore from '../store/app.store';

const AuthLayout = () => {
    const token = useTokenStore((state) => state.token);

    if (token) {
        return <Navigate to={'/'} replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthLayout;
