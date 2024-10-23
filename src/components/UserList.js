import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; // Make sure to import your Pagination component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // Filter status: all, active, inactive
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set the number of users to display per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersWithStatus = response.data.map(user => ({
          ...user,
          status: Math.random() > 0.5 ? 'Active' : 'Inactive' // Randomly assign status for demonstration
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term and selected status
  const filteredUsers = users.filter(user => {
    const isNameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isEmailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = filterStatus === 'all' || user.status === filterStatus;

    return (isNameMatch || isEmailMatch) && isStatusMatch;
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px' }}
      />

      {/* Filter Dropdown */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px' }}
      >
        <option value="all">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* User Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UserList;
