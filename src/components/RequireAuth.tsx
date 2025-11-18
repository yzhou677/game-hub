import { Navigate } from "react-router-dom";
import { useAuthStore } from "../authstore";

interface Props {
    children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
    const user = useAuthStore((s) => s.user);

    if (!user) return <Navigate to="/" replace />;

    return children;
};

export default RequireAuth;
