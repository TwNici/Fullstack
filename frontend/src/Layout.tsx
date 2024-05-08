import { To, useNavigate} from 'react-router-dom';
import './App.css';

function Layout() {
    const navigate = useNavigate();
    const handleChange = (event: { target: { value: To; }; }) => {
        navigate(event.target.value);
    };
    const mitarbeiternav = () => {
        navigate("/createmitarbeiter");
    };
    const suchenav = () => {
        navigate("/");
    };
    const erweitertesuchenav = () => {
        navigate("/erweitertesuche");
    };
    const profilanpassennav = () => {
        navigate("/profilanpassen");
    };



    return (
        <div>

            <div id="leftcanvas" className="btn-layout-vertical shadow-and-radius">
                    <button className="btn-layout shadow-and-radius" onClick={suchenav}>
                        Suche
                    </button>
                    <button className="btn-layout shadow-and-radius" onClick={erweitertesuchenav}>
                        Erweiterte Suche
                    </button>
                    <button className="btn-layout shadow-and-radius" onClick={mitarbeiternav}>
                        Neue Mitarbeiter eintragen
                    </button>
                    <button className="btn-layout shadow-and-radius" onClick={profilanpassennav}>
                        Profil anpassen
                    </button>
                </div>
            <div id="uppercanvas" className={"shadow-and-radius"}><h4 onClick={suchenav}>Adressbuch</h4> <h6 id="Profillist">
                <select onChange={handleChange} className="btn-layout shadow-and-radius" id={"dropdownLAYOUT"}>
                    <option value="">Profil</option>
                    <option value="/edit">Profil bearbeiten</option>
                    <option value="/Login">Logout</option>

                </select></h6></div>
            <div className={"circles "}></div>
            <div className={"circles2 "}></div>
            <div className={"circles3 "}></div>

        </div>
    );
}

export default Layout;
