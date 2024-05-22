import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/404Page.css"

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
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (

        <div id={"content"} className={"shadow-and-radius "}>

            <h1 className={"emoji-container"}>🔍 404 Not Found</h1>
            <p>You will be redirected to the main page in {counter} seconds.</p>
        </div>
    );
}
