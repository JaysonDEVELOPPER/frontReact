import NavBarClient from "../navBars/NavBarClient";
import FooterClient from "../footers/FooterClient";
import BankAccount from "../acceuilCompte/BankAccount";

function AccountPage(){
    return(
        <>
        <NavBarClient />
        <h1>Welcome Account Page</h1>
    <BankAccount/>
        <FooterClient />
        </>
        
    )
};

export default AccountPage;