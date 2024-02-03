import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import LeadDetailsDrawer from '../components/LeadDetailsDrawer';
import DateRangeFilter from '../../src/components/DateRangeFilter';
import { deleteLeadDataById, fetchData } from '../utils/api';

interface Lead {
  lead_id: number;
  lead_name: string;
  email: string;
  lead_status: string;
  source: string;
  added_date: string;
  updated_date: string;
  deleted: string | null;
  interaction_count: string;
}

const Dashboard: React.FC = () => {
    const router = useRouter();

  const [data, setData] = useState<Lead[]>([]);
  const [filteredData, setFilteredData] = useState<Lead[]>([]);

  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result =  await fetchData('lead');
        setFilteredData(result); 

        setData(result);
      } catch (error) {
        // Handle error as needed
      }
    };

    fetchDashboardData();
  }, []);

  const handleDelete = async (leadId: number) => {
    try {
        deleteLeadDataById
        await deleteLeadDataById(`lead/${leadId}`);
  
        setData((prevData) => prevData.filter((lead) => lead.lead_id !== leadId));
        setFilteredData((prevData) => prevData.filter((lead) => lead.lead_id !== leadId));

      } catch (error) {
        console.error('Error deleting lead:', error);
      }
  };

  const handleUpdate = (leadId: number) => {
    router.push(`/lead/${leadId}`);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilter = (startDate: string, endDate: string) => {
    const filteredResult = data.filter(
      (lead) =>
        new Date(lead.added_date) >= new Date(startDate) && new Date(lead.added_date) <= new Date(endDate)
    );

    setFilteredData(filteredResult);
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) {
      return filteredData;
    }    

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA === valueB) {
        return 0;
      }

      return sortDirection === 'asc' ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    });
  }, [filteredData, sortField, sortDirection]);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleCloseDrawer = () => {
    setSelectedLead(null);
  };


  return (
    <div>
      <h1>Lead Dashboard</h1>
      {/* <Link href="/overview">
        Overview
      </Link> */}
      <DateRangeFilter onFilter={handleFilter} />
      <table>
        <thead>
          <tr>
          <th onClick={() => handleSort('lead_id')}>Lead ID</th>
            <th onClick={() => handleSort('lead_name')}>Lead Name</th>
            <th onClick={() => handleSort('interaction_count')}>Interaction Count</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('lead_status')}>Status</th>
            <th onClick={() => handleSort('source')}>Source</th>
            <th onClick={() => handleSort('added_date')}>Added Date</th>
            <th onClick={() => handleSort('updated_date')}>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {sortedData.map((lead) => (
            <tr key={lead.lead_id} onClick={() => handleLeadClick(lead)}>
              <td>{lead.lead_id}</td>
              <td>{lead.lead_name}</td>
              <td>{lead.interaction_count}</td>
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
      <LeadDetailsDrawer isOpen={!!selectedLead} onClose={handleCloseDrawer} leadDetails={selectedLead} />

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