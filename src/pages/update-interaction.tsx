import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchInteractionById, updateInteraction } from '../utils/api';

const UpdateInteraction: React.FC = () => {
  const router = useRouter();
  const { lead_id, interaction_id } = router.query;

  const [interactionData, setInteractionData] = useState<any>({
    lead_id: lead_id ? Number(lead_id) : 0,
    interaction_type: '',
    interaction_date: '',
    details: { priority: '', follow_up_date: '' },
  });


  useEffect(() => {
    const fetchInteractionData = async () => {
      try {
        if (interaction_id) {
          const result = await fetchInteractionById(`interaction/${interaction_id}`);
          setInteractionData({ ...result, lead_id });
        }
      } catch (error) {
        console.error('Error fetching interaction data:', error);
      }
    };

    fetchInteractionData();
  }, [interaction_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'details-priority' || name === 'details-follow-up-date') {
      setInteractionData((prevData: any) => ({
        ...prevData,
        details: {
          ...prevData.details,
          [name.split('-')[1]]: value,
        },
      }));
    } else {
      setInteractionData((prevData: any) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateInteraction(interactionData);
      router.push(`/dashboard`); // Redirect to lead details page after successful update
    } catch (error) {
      console.error('Error updating interaction:', error);
    }
  };

  return (
    <div>
      <h1>Update Interaction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Lead ID:
          <input type="number" name="lead_id" value={interactionData.lead_id} onChange={handleChange} disabled />
        </label>
        <br />
        <label>
          Interaction Type:
          <select
            name="interaction_type"
            value={interactionData.interaction_type}
            onChange={handleChange}
            required
          >
            <option value="Email">Email</option>
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
          </select>
        </label>
        <br />
        {interactionData.interaction_date && (
          <label>
            Interaction Date:
            <input
              type="date"
              name="interaction_date"
              value={interactionData.interaction_date}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <br />
        <label>
          Details - Priority:
          <input
            type="text"
            name="details-priority"
            value={interactionData.details.priority}
            onChange={handleChange}
            required
          />
        </label>
        <br />
          <label>
            Details - Follow-up Date:
            <input
              type="date"
              name="details-follow-up-date"
              value={interactionData.details.follow_up_date}
              onChange={handleChange}
              required
            />
          </label>
        <br />
        <button type="submit">Update Interaction</button>
      </form>
      <style jsx>{`
        form {
          margin-top: 20px;
        }

        label {
          display: block;
          margin-bottom: 10px;
        }

        input,
        select,
        textarea {
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

export default UpdateInteraction;
