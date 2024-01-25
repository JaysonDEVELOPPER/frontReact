import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBarTemplate({
  NavLink1,
  NavValue1,
  NavLink2,
  NavValue2,
  NavLink3,
  NavValue3,
  NavLink4,
  NavValue4,
  NavLink5,
  NavValue5,
  NavLink6,
  NavValue6,
  onLogout,
}) {
  const [username, setUsername] = useState('');

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = decodeJwt(token).user_id;
      
      fetch(`http://127.0.0.1:8000/User/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUsername(data.username); // Supposer que 'username' est le champ contenant le nom de l'utilisateur
        })
        .catch(error => console.error('Error:', error));
    }
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand alt="Accueil">
          <Link to="/">
            {" "}
            <img
              src="https://i.imgur.com/lUNJbPb.png"
              width="130"
              height="40"
            />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav id="navBar">
          <Nav.Link>{username}</Nav.Link>
            <Nav.Link as={Link} to={NavLink1}>
              {NavValue1}
            </Nav.Link>
            <Nav.Link as={Link} to={NavLink2}>
              {NavValue2}
            </Nav.Link>
            <Nav.Link as={Link} to={NavLink3}>
              {NavValue3}
            </Nav.Link>
            <Nav.Link as={Link} to={NavLink4}>
              {NavValue4}
            </Nav.Link>
            <Nav.Link as={Link} to={NavLink5}>
              {NavValue5}
            </Nav.Link>
            <Nav.Link as={Link} to={NavLink6} onClick={NavValue6 === "SE DECONNECTER" ? onLogout : undefined}>
                    {NavValue6}
                </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarTemplate;
