import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const MemberTable = () => {
  const [members, setMembers] = useState([]); // To hold member data
  const [loading, setLoading] = useState(true); // To manage loading state

  const apiUrl =
    'https://crudcrud.com/api/3ad42c03342049d1b19418606b6c7265/members';

  useEffect(() => {
    // Fetch members data on component mount
    axios
      .get(apiUrl)
      .then(response => {
        setMembers(response.data); // Set the fetched data to state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setLoading(false); // Set loading to false on error
      });
  }, []); // Empty dependency array to run only once when the component mounts

  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Member List</h2>
      {loading ? (
        <div>Loading...</div> // Show loading text while data is being fetched
      ) : (
        <DataTable
          columns={columns} // Table columns definition
          data={members} // Data to populate the table
          pagination // Enable pagination
          highlightOnHover // Highlight row on hover
          striped // Make rows striped for better visibility
        />
      )}
    </div>
  );
};

export default MemberTable;
