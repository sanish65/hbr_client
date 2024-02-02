// pages/dashboard.tsx
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

interface Lead {
  lead_id: number;
  lead_name: string;
  email: string;
  lead_status: string;
  source: string;
  added_date: string;
  updated_date: string;
  deleted: string | null;
}

const Dashboard: React.FC = () => {
    const router = useRouter();

  const [data, setData] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result =  await fetchData('lead');
        setData(result);
      } catch (error) {
        // Handle error as needed
      }
    };

    fetchDashboardData();
  }, []);

  const handleDelete = async (leadId: number) => {
    try {
        await fetch(`http://localhost:5000/lead/delete/${leadId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        setData((prevData) => prevData.filter((lead) => lead.lead_id !== leadId));
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
  };

  const handleUpdate = (leadId: number) => {
    router.push(`/lead/${leadId}`);
  };

  return (
    <div>
      <h1>Lead Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Lead Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Source</th>
            <th>Added Date</th>
            <th>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lead) => (
            <tr key={lead.lead_id}>
              <td>{lead.lead_id}</td>
              <td>{lead.lead_name}</td>
              <td>{lead.email}</td>
              <td>{lead.lead_status}</td>
              <td>{lead.source}</td>
              <td>{new Date(lead.added_date).toLocaleString()}</td>
              <td>{new Date(lead.updated_date).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(lead.lead_id)}>Delete</button>
                <button onClick={() => handleUpdate(lead.lead_id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        th {
          background-color: #f2f2f2;
        }

        button {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;