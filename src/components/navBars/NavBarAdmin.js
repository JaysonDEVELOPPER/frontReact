import NavBarTemplate from "./NavBarTemplate";
import { Link, useNavigate } from "react-router-dom";

function NavBarAdmin(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Assurez-vous que 'token' est le nom correct de la clé
        navigate('/'); // Redirigez vers la page de connexion ou une autre page
    }
    return(
        <>
        <NavBarTemplate NavValue3={"Espace Admin"} NavValue6={"SE DECONNECTER"} NavLink6={"/"}
        onLogout={handleLogout} />
        
        </>
    )
};

export default NavBarAdmin;