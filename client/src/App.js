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

  const apiUrl = 'http://localhost:5000/members';

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

  const handleSearch = event => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredMembers = members.filter(
    member =>
      (member.name &&
        member.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        toast.success('Member deleted successfully!');
        setMembers(members.filter(member => member._id !== id));
      })
      .catch(() => toast.error('Failed to delete member'));
  };

  const handleEdit = member => {
    setCurrentMember({ ...member });
    setIsEditing(true);
  };

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

  const handleAddMember = () => {
    setCurrentMember({
      name: '',
      email: '',
      age: '',
      parent_id: 0,
    });
    setIsAdding(true);
  };

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
          handleDelete={handleDelete}
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
