import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Link , useLocation} from 'react-router-dom';

function Pilots(){
    const [pilots, setPilots] = useState([]);
    const { companyId } = useParams();

    const location = useLocation();
    const { companyNameToTransfer } = location.state;

    useEffect(() => {
        // Fetch data from API
        fetch(`http://localhost:5050/getPilot/${companyId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(pilots => setPilots(pilots))
        .catch(error => console.error('Error fetching data:', error));
    }, [companyId]);

    const handleDelete = (pilotId) => {
        // Send DELETE request to backend
        fetch(`http://localhost:5050/deletePilot/${pilotId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setPilots(pilots.filter(pilots => pilots._id !== pilotId));
            }
        })
        .catch(error => console.error('Error deleting pilot:', error));
    };

    return(
        <div>
            <h2>Pilots of {companyNameToTransfer}</h2>
            <Link to="/">
                <button type="button" className="btn btn-primary">Back</button>
            </Link>
            <Link to={`/addPilot`} state={{companyId: companyId}}>
                <button type="button" className="btn btn-primary">Add pilot</button>
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Flight Hours</th>
                </tr>
                </thead>
                <tbody>
                {pilots.map(item => (
                    <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>{item.flight_hours}</td>
                    <td> 
                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                        
                        <Link to={`/editPilot/${item._id}`} state={{ playerDataToEdit: item }}>
                            <button className="btn btn-primary ml-2">Edit</button>
                        </Link>
                    </td> 
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Pilots