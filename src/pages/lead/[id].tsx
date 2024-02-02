// pages/updateLead.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UpdateLead: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [leadData, setLeadData] = useState({
    lead_id: 0,
    lead_name: '',
    email: '',
    lead_status: '',
    source: '',
  });

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        // Fetch lead data based on the ID from your API
        // const response = await fetch(`http://localhost:5000/lead/${id}`);
         const response =
            {
            "lead_id":1,
            "lead_name":"Turcotte Inc",
            "email":"zdullingham0@a8.net",
            "lead_status":"Qualified",
            "source":"Web",
        };
        const data = await response;
        setLeadData(data);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    };

    if (id) {
      fetchLeadData();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
        console.log("checking")

      await fetch(`http://localhost:5000/lead/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating lead data:', error);
    }
  };

  return (
    <div>
      <h1>Update Lead</h1>
      <form>
        <label>
          Lead ID:
          <input type="text" value={leadData.lead_id} readOnly />
        </label>
        <br />
        <label>
          Lead Name:
          <input
            type="text"
            value={leadData.lead_name}
            onChange={(e) => setLeadData({ ...leadData, lead_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={leadData.email}
            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Lead Status:
          <input
            type="text"
            value={leadData.lead_status}
            onChange={(e) => setLeadData({ ...leadData, lead_status: e.target.value })}
          />
        </label>
        <br />
        <label>
          Source:
          <input
            type="text"
            value={leadData.source}
            onChange={(e) => setLeadData({ ...leadData, source: e.target.value })}
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleUpdate}>
          Update Lead
        </button>
      </form>
      <style jsx>{`
        form {
          margin-top: 20px;
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          padding: 8px;
        }

        button {
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default UpdateLead;
