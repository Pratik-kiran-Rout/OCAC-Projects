import React from 'react';
import './Table.css';

const Table = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '********' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '********' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: '********' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', password: '********' },
    { id: 5, name: 'David Brown', email: 'david@example.com', password: '********' }
  ];

  return (
    <div className="table-container">
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>SI No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;