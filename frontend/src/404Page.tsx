import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState<number>(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter > 0) {
                    return prevCounter - 1;
                } else {
                    navigate("/");
                    clearInterval(interval); // Clear interval to prevent memory leak
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
            <h1>Page not Found</h1>
            <p>You will be redirected to the main page in {counter} seconds.</p>
        </div>
    );
}
