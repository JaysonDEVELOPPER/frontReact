import React, { useEffect, useState } from "react";
import NavBarAdmin from "../navBars/NavBarAdmin";
import FooterAdmin from "../footers/FooterAdmin";
import { useNavigate } from "react-router-dom";
import { verification } from '../verification';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
    
        const userData = verification(token);
        if (!userData || !userData.roles.includes('ROLE_ADMIN')) {
            navigate('/account');
            return;
        }

    fetch('http://127.0.0.1:8000/Users')
        .then(response => response.json())
        .then(data => {
            setAdmins(data.filter(user => user.roles.includes('ROLE_ADMIN')));
            setUsers(data.filter(user => user.roles.includes('ROLE_USER') && !user.roles.includes('ROLE_ADMIN')));
        })
        .catch(error => console.error('Error:', error));
}, [navigate]);

  return (
    <>
      <NavBarAdmin />
      <div className="container-fuild">
        <h1
          className="mb-5 mb-5"
          style={{ background: "black", color: "white" }}
        >
          PANEL ADMIN
        </h1>

        <h2 className="text-center">Admins</h2>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {admins.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-center">Users</h2>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterAdmin />
    </>
  );
}

export default AdminPage;
