import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";

function FooterTemplate({ FooterLink1, FooterValue1, FooterLink2, FooterValue2, FooterLink3, FooterValue3, FooterLink4, FooterValue4, FooterLink5, FooterValue5, FooterLink6, FooterValue6 }) {
    return (
        <Accordion defaultActiveKey={['0']}>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="text-center">B.BANK</Accordion.Header>
                <Accordion.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p>Nous contacter : b.bank@email</p>
                                <p>10 rue de la Bourse 34 500 Béziers</p>
                                <Link to="/mailto">Email</Link>
                                <Link to="/conditions">Conditions d'utilisation</Link>
                                <Link to="/legal-notice">Mentions légales</Link>
                            </div>
                            <div className="col">
                                <Link to={FooterLink1}>{FooterValue1}</Link>
                                <Link to={FooterLink2}>{FooterValue2}</Link>
                                <Link to={FooterLink3}>{FooterValue3}</Link>
                                <Link to={FooterLink4}>{FooterValue4}</Link>
                                <Link to={FooterLink5}>{FooterValue5}</Link>
                                <Link to={FooterLink6}>{FooterValue6}</Link>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default FooterTemplate;
