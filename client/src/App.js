import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Table from './Components/Table';
import Pagination from './Components/Pagination';
import MemberForm from './Components/MemberForm';
import Search from './Components/Search';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Define API URL
  const apiUrl =
    'https://crudcrud.com/api/84db23366720446cb5bb84fdad90daf6/members';

  // Fetch members on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  // Handle search
  const handleSearch = event => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter members based on search
  const filteredMembers = members.filter(
    member =>
      (member.name &&
        member.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Handle delete
  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        toast.success('Member deleted successfully!');
        setMembers(members.filter(member => member._id !== id));
      })
      .catch(() => toast.error('Failed to delete member'));
  };

  // Handle edit
  const handleEdit = member => {
    setCurrentMember({ ...member });
    setIsEditing(true);
  };

  // Handle save after editing
  const handleSave = async () => {
    if (!currentMember.name || !currentMember.email) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await axios.put(`${apiUrl}/${currentMember._id}`, currentMember);
      toast.success('Member updated successfully!');
      setIsEditing(false);
      setMembers(
        members.map(m => (m._id === currentMember._id ? currentMember : m))
      );
    } catch (error) {
      toast.error('Failed to update member');
    }
  };

  // Handle adding new member
  const handleAddMember = () => {
    setCurrentMember({
      name: '',
      email: '',
      age: '',
      parent_id: 0,
    });
    setIsAdding(true);
  };

  // Handle saving a new member
  const handleAddSave = async () => {
    if (!currentMember.name || !currentMember.email) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(apiUrl, currentMember);
      toast.success('Member added successfully!');
      setIsAdding(false);
      setMembers([...members, response.data]);
    } catch (error) {
      toast.error('Failed to add member');
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredMembers.length / pageLimit);

  return (
    <div className="app-background">
      <div className="container mt-5">
        <h2>All Members</h2>
        <Search
          searchText={searchText}
          handleSearch={handleSearch}
          handleAddMember={handleAddMember}
        />

        <Table
          filteredMembers={filteredMembers}
          handleDelete={handleDelete} // Pass handleDelete to Table
          handleEdit={handleEdit}
          currentPage={currentPage}
          pageLimit={pageLimit}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setPageLimit={setPageLimit}
          pageLimit={pageLimit}
        />

        <MemberForm
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
          handleAddSave={handleAddSave}
          handleSave={handleSave}
          isEditing={isEditing}
          isAdding={isAdding}
          closeModal={() => {
            setIsEditing(false);
            setIsAdding(false);
          }}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
