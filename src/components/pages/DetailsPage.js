import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import NavBarClient from "../navBars/NavBarClient";
import FooterClient from "../footers/FooterClient";

function DetailsPage() {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({});

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
        const userId = decodeJwt(token).user_id;

        fetch(`http://127.0.0.1:8000/transactions/bankaccount/${userId}`)
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
                updateChartData(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    const updateChartData = (transactions) => {
        const categories = {};
        transactions.forEach(transaction => {
            const category = transaction.fk_cat_id.cat_type;
            categories[category] = (categories[category] || 0) + transaction.trs_amount;
        });

        setChartData({
            labels: Object.keys(categories),
            datasets: [
                {
                    label: 'Dépenses par Catégorie',
                    data: Object.values(categories),
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',  // Bleu
                        'rgba(255, 99, 132, 0.5)',   // Rouge
                        'rgba(75, 192, 86, 0.5)',    // Vert
                        'rgba(255, 206, 86, 0.5)',   // Jaune
                        'rgba(0, 0, 0, 0.5)',        // Noir
                        'rgba(91, 162, 135, 0.5)',    // Mauve
                        'rgba(11, 52, 235, 0.5)' ,   // Mauve
                        'rgba(25, 162, 15, 0.5)' ,   // Mauve
                        'rgba(111, 62, 135, 0.5)',    // Mauve
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.5)',        // Noir
                        'rgba(0, 0, 0, 0.5)',        // Noir
                        // ... autres couleurs ...
                    ],
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <>
            <NavBarClient />
            <h1>Transactions Page</h1>
            <div className="container mt-4"></div>
            <div className="chart-container" style={{ width: '400px', height: '400px', margin: 'auto' }}>
                    {chartData && chartData.datasets && (
                        <div>
                            <h2>Répartition des Dépenses</h2>
                            <Doughnut data={chartData} />
                        </div>
                    )}
                </div>
            <div className="container mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Type de Transaction</th>
                            <th>Catégorie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.trs_date).toLocaleDateString()}</td>
                                <td>{transaction.trs_amount}</td>
                                <td>{transaction.fk_trt_id.trt_type}</td>
                                <td>{transaction.fk_cat_id.cat_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FooterClient />
        </>
    );
}

export default DetailsPage;
