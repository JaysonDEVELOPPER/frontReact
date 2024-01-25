import NavBarHome from "../navBars/NavBarHome";
import FooterHome from "../footers/FooterHome"
import BankAccount from "../acceuilCompte/BankAccount";

function AboutPage(){
    return(
        <>
        <NavBarHome />
        <h1>Welcome About Page</h1>
        <BankAccount/>
        <FooterHome />
        </>
    )
};

export default AboutPage;