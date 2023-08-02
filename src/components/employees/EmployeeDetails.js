import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getEmployees } from "../../data/employeeData";

export default function EmployeeDetails() {
  const {  } = useParams();

  const [employee, setEmployee] = useState([]);
  
useEffect(() => {
  getEmployees().then(setEmployee);
});
  
  if (!employee) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Employee</th>
          <td>{employee.employee?.Id}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <th scope="row">Specialty</th>
          <td>{employee.specialty}</td>
        </tr>
      </tbody>
    </Table>
  );
}
