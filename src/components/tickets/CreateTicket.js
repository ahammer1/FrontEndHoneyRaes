// export default function CreateTicket() {
//   return <h3>Submit a Ticket</h3>;
// }
import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../data/customerData';
import { getEmployees } from '../../data/employeeData';

const ServiceTicketForm = () => {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    getCustomers().then(data => setCustomers(data));
    getEmployees().then(data => setEmployees(data));
  }, []);
  
  const handleEmergencyToggle = () => {
      setIsEmergency(!isEmergency);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newTicket = {
      customer_id: selectedCustomer,
      employee_id: selectedEmployee,
      title: ticketTitle,
      description: ticketDescription,
      is_emergency: isEmergency,
    };

    const response = await fetch('/servicetickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    });

    if (response.ok) {
      console.log('Ticket created successfully');
      setSelectedCustomer('');
      setSelectedEmployee('');
      setTicketTitle('');
      setTicketDescription('');
    } else {
      console.error('Error creating ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Customer:</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Employee:</label>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select an employee</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>{employee.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Ticket Title:</label>
        <input type="text" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} />
      </div>
      <div>
        <label>Ticket Description:</label>
        <textarea value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} />
      </div>
      <div>
        <label>Emergency:</label>
        <input
          type="checkbox"
          checked={isEmergency}
          onChange={handleEmergencyToggle}
        />
      </div>
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default ServiceTicketForm;
