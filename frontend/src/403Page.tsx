import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState<number>(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter > 0) {
                    return prevCounter - 1;
                } else {
                    navigate("/login");
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
            <h1>Access Denied</h1>
            <p>You will be redirected to the login page in {counter} seconds.</p>
        </div>
    );
}
