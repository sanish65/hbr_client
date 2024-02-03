// pages/Overview.tsx

import React, { useState, useEffect } from 'react';
import Chart from '../components/Charts';
import { fetchLeadsPerSourceWithStatus, fetchLeadsPerStatus } from '../utils/api';

const Overview: React.FC = () => {
  const [leadsPerSource, setLeadsPerSource] = useState<any[]>([]);
  const [leadsPerStatus, setLeadsPerStatus] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsBySource = await fetchLeadsPerSourceWithStatus();
        const leadsByStatus = await fetchLeadsPerStatus();

        setLeadsPerSource(leadsBySource);
        setLeadsPerStatus(leadsByStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      <div>
        <h2>Leads per Source with Status</h2>
        <Chart data={leadsPerSource} chartType="bar" />
      </div>
      <div>
        <h2>Leads per Status</h2>
        <Chart data={leadsPerStatus} chartType="pie" />
      </div>
    </div>
  );
};

export default Overview;
