import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function BankAccount() {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [countdown, setCountdown] = useState(10); // Compteur de 4 secondes


    const decodeJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            setShowMessage(true);
            const interval = setInterval(() => {
                setCountdown((currentCount) => currentCount - 1);
            }, 2000);
            setTimeout(() => {
                clearInterval(interval);
                navigate('/');
            }, 10000);
            return;
        }

        const userId = decodeJwt(token).user_id; // Extraire l'ID de l'utilisateur
        console.log(userId)
        fetch(`http://127.0.0.1:8000/BankAccount/${userId}`, { // Utiliser l'ID ici
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setAccountData(data);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    

      if (showMessage) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-warning" role="alert">
                    Vous devez être connecté pour accéder à cette page! Redirection dans {countdown} secondes.
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
          <div className="loader">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
        );
      }
      if (error) return <div>Attention : {error}</div>;
      

      return (
        <div className="container mt-5 mb-5">
            <h2>Account Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Numero du compte: {accountData?.id} </h5>
                    <p className="card-text">Balance: {accountData?.bnk_balance} €</p>
                    <p className="card-text">{accountData?.bnk_debit ? 'Debit Account' : 'Credit Account'}</p>
                    <p className="card-text">Email: {accountData?.fk_usr_id?.email}</p>
                    <p className="card-text">Nom d'utilisateur: {accountData?.fk_usr_id?.username}</p>
                    {/* Afficher les rôles si nécessaire */}
                </div>
            </div>
        </div>
    );
}

export default BankAccount;
