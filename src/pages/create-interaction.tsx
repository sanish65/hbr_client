// pages/create-interaction.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createInteraction } from '../utils/api';

// Define the InteractionType enum
export enum InteractionType {
  EMAIL = 'Email',
  CALL = 'Call',
  MEETING = 'Meeting',
}

const CreateInteraction: React.FC = () => {
  const router = useRouter();
  const { lead_id } = router.query; // Retrieve lead_id from the URL

  const [interactionData, setInteractionData] = useState({
    lead_id: lead_id ? Number(lead_id) : 0,
    interaction_type: InteractionType.EMAIL, // Default to Email, you can change it based on your requirements
    interaction_date: '',
    priority: '',
    follow_up_date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInteractionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const details = {
        priority: interactionData.priority,
        follow_up_date: interactionData.follow_up_date,
      };

      await createInteraction(interactionData);

      await createInteraction({
        ...interactionData,
        details,
      });

    //   router.push(`/lead/${interactionData.lead_id}`);
    } catch (error) {
      console.error('Error creating interaction:', error);
    }
  };

  useEffect(() => {
    setInteractionData((prevData) => ({ ...prevData, lead_id: lead_id ? Number(lead_id) : 0 }));
  }, [lead_id]);

  return (
    <div>
      <h1>Create Interaction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Lead ID:
          <input
            type="number"
            name="lead_id"
            value={interactionData.lead_id}
            onChange={handleChange}
            required
            readOnly
          />
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
            {Object.values(InteractionType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <br />
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
        <br />
        <label>
          Priority:
          <input
            type="text"
            name="priority"
            value={interactionData.priority}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Follow-up Date:
          <input
            type="date"
            name="follow_up_date"
            value={interactionData.follow_up_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Interaction</button>
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
        select {
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

export default CreateInteraction;
