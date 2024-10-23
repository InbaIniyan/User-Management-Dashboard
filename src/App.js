import React, { useEffect, useState } from 'react';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        
        // Add status field to each user
        const updatedUsers = data.map(user => ({
          ...user,
          status: Math.random() > 0.5 ? 'Active' : 'Inactive' // Randomly assign Active/Inactive
        }));

        setUsers(updatedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <center><h1>User Management Dashboard</h1></center>
      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <UserList users={users} />}
    </div>
  );
};

export default App;
