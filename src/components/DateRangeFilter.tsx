// components/DateRangeFilter.tsx
import React, { useState } from 'react';

interface DateRangeFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default DateRangeFilter;
