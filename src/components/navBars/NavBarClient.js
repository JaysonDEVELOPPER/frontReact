import NavBarTemplate from "./NavBarTemplate";
import { useNavigate } from 'react-router-dom';

function NavBarClient(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Assurez-vous que 'token' est le nom correct de la clé
        navigate('/'); // Redirigez vers la page de connexion ou une autre page
    }
    

    return(
        <>
        <NavBarTemplate 
            NavValue1={"Mon Compte"} NavLink1={"/account"} 
            NavValue2={"Mes Transactions"} NavLink2={"/details"} 
            NavValue3={"Mon Budget"} NavLink3={"/budget"} 
            NavValue4={"Mon Prévisionnel"} NavLink4={"/forecast"} 
            NavValue5={"Virements"} NavLink5={"/transfer"} 
            NavValue6={"SE DECONNECTER"} NavLink6={"/"}
            onLogout={handleLogout} // Passer la fonction de déconnexion
        />
        </>
    )
};

export default NavBarClient;

