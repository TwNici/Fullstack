import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

type roleType = "USER" | "ADMIN"; // Define roleType according to your application

const SecuredRoute = ({ children }: { children: JSX.Element }) => {
    const [role, setRole] = useState<roleType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/user/getrole", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res: AxiosResponse<roleType>) => {
            setRole(res.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching user role:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <></>;
    }

    if (role === "USER") {
        return <Navigate to="*" replace />;
    }

    return children;
};

export default SecuredRoute;
