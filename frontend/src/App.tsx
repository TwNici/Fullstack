import Adressbuch from './Adressbuch.tsx';
import {Route, Routes} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import Layout from "./Layout.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
    return (
        <div>
            <Layout />
            <Routes>
                <Route path="/" element={<Adressbuch />} />
                <Route path="/createmitarbeiter" element={<Createmitarbeiter />} />
                <Route path="/profilanpassen" element={<Createmitarbeiter />} />
                <Route path="/erweitertesuche" element={<Createmitarbeiter />} />
            </Routes>
        </div>
    );
}









export default App;
