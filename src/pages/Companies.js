import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Companies(){
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:5050/getCompanies', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(companies => setCompanies(companies))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <div>
        <h2>Airline companies</h2>
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Operative Base</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
            {companies.map(item => (
                <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.operative_base.city}</td>
                <td>{item.operative_base.country}</td>
                <td> 
                    <Link to={`/Pilots/${item._id}`} state={{ companyNameToTransfer: item.name}}>
                        View pilots
                    </Link>
                </td> 
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}

export default Companies
