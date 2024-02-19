import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import LeadDetailsDrawer from '../components/LeadDetailsDrawer';
import DateRangeFilter from '../../src/components/DateRangeFilter';
import {  deleteWebsiteById, fetchWebsiteData } from '../utils/api';

interface Website {
  id: number;
  name: string;
  url: string;
  status: string;
  logoUrl: string;
  addedAt : string;
  userId : string
}

interface WebsiteWithIndexSignature extends Website {
  [key: string]: any;
}

const Dashboard: React.FC = () => {
    const router = useRouter();

  const [data, setData] = useState<Website[]>([]);
  const [filteredData, setFilteredData] = useState<Website[]>([]);

  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedLead, setSelectedLead] = useState<Website | null>(null);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result =  await fetchWebsiteData();
        setFilteredData(result); 

        setData(result);
      } catch (error) {
        // Handle error as needed
      }
    };

    fetchDashboardData();
  }, []);

  const handleDelete = async (webId: number) => {
    try {
        await deleteWebsiteById(`web-stats/${webId}`);
        setData((prevData) => prevData.filter((web) => web.id !== webId));
        setFilteredData((prevData) => prevData.filter((web) => web.id !== webId));

      } catch (error) {
        console.error('Error deleting lead:', error);
      }
  };

  const handleUpdate = (webId: number) => {
    router.push(`/web-stats/${webId}`);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilter = (startDate: string, endDate: string) => {
    const filteredResult = data.filter(
      (web) =>
        new Date(web.addedAt) >= new Date(startDate) && new Date(web.addedAt) <= new Date(endDate)
    );

    setFilteredData(filteredResult);
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) {
      return filteredData;
    }    

    return [...filteredData].sort((a, b) => {
      const valueA = (a as WebsiteWithIndexSignature)[sortField];
      const valueB = (b as WebsiteWithIndexSignature)[sortField];

      if (valueA === valueB) {
        return 0;
      }

      return sortDirection === 'asc' ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    });
  }, [filteredData, sortField, sortDirection]);

  const handleLeadClick = (web: Website) => {
    setSelectedLead(web);
  };

  const handleCloseDrawer = () => {
    setSelectedLead(null);
  };


  return (
    <div>
      <nav>
      <a href="/api/auth/logout" className="logout-link">Logout</a>
      </nav>
      <h1>Websites Lists</h1>
      <DateRangeFilter onFilter={handleFilter} />
      <table>
        <thead>
          <tr>
          <th onClick={() => handleSort('logoUrl')}> Logo</th>
            <th onClick={() => handleSort('name')}> Name</th>
            <th onClick={() => handleSort('url')}> Url</th>
            <th onClick={() => handleSort('status')}>  Status</th>
            <th onClick={() => handleSort('addedAt')}>  Added At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {sortedData.map((web) => (
            <tr key={web.id} onClick={() => handleLeadClick(web)}>
              <td>{web.logoUrl}</td>
              <td>{web.name}</td>
              <td>{web.url}</td>
              <td>{web.status}</td>
              <td>{web.addedAt}</td>
              <td>
                <button onClick={() => handleDelete(web.id)}>Delete</button>
                <button onClick={() => handleUpdate(web.id)}>Update</button>
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