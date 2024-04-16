import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';

function NewPilotForm() {
    const [pilotName, setPilotName] = useState('');
    const [pilotEmail, setPilotEmail] = useState('');
    const [pilotPhone, setPilotPhone] = useState('');
    const [pilotRole, setPilotRole] = useState('');
    const [pilotFlightHours, setPilotFlightHours] = useState('');

    const location = useLocation();
    const { companyId } = location.state;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Send a POST request to your backend API endpoint to add the new player
        fetch('http://localhost:5050/addPilot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: pilotName,
                email: pilotEmail,
                phone: pilotPhone,
                role: pilotRole,
                company: companyId,
                flight_hours: parseInt(pilotFlightHours, 10)
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Pilot added successfully');
                window.history.back();
            } else {
                console.error('Failed to add pilot');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Add Pilot</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="pilotName" className="form-label">Pilot Name</label>
                    <input type="text" className="form-control" id="pilotName" value={pilotName} onChange={(e) => setPilotName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pilotEmail" className="form-label">Pilot Email</label>
                    <input type="text" className="form-control" id="pilotEmail" value={pilotEmail} onChange={(e) => setPilotEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pilotPhone" className="form-label">Pilot Phone</label>
                    <input type="text" className="form-control" id="pilotPhone" value={pilotPhone} onChange={(e) => setPilotPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pilotRole" className="form-label">Pilot Role (First-Officer / Captain)</label>
                    <input type="text" className="form-control" id="pilotRole" value={pilotRole} onChange={(e) => setPilotRole(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pilotFlightHours" className="form-label">Pilot Flight Hours</label>
                    <input type="text" className="form-control" id="pilotRole" value={pilotFlightHours} onChange={(e) => setPilotFlightHours(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewPilotForm;