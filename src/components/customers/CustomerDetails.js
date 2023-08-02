import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getCustomersList } from "../../data/customerData";

export default function CustomerDetails() {
  const { } = useParams();

  const [customer, setCustomer] = useState([]);
  
useEffect(() => {
  getCustomersList().then(setCustomer);
});
  
  if (!customer) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{customer.customer?.Id}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{customer.name}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{customer.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}
