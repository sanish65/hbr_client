// components/LeadDetailsDrawer.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { deleteInteractionById, fetchInteractionsByLeadId } from '../utils/api';

interface LeadDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leadDetails: any; // Adjust the type based on your Lead interface
}

const LeadDetailsDrawer: React.FC<LeadDetailsDrawerProps> = ({ isOpen, onClose, leadDetails }) => {
    const router = useRouter();

  const [interactions, setInteractions] = useState<any[]>([]); // Adjust the type based on your Interaction interface

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        if (leadDetails && leadDetails.lead_id) {
          const result = await fetchInteractionsByLeadId(`interaction/lead/${leadDetails.lead_id}`);
          setInteractions(result);
        }
      } catch (error) {
        console.error('Error fetching interactions:', error);
      }
    };

    fetchInteractions();
  }, [leadDetails]);

  const handleUpdateInteraction = (interactionId: number) => {
    if (leadDetails && leadDetails.lead_id) {
      router.push(`/update-interaction?lead_id=${leadDetails.lead_id}&interaction_id=${interactionId}`);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCreateInteraction = () => {
    // Navigate to the create interaction page with the lead ID
    if (leadDetails && leadDetails.lead_id) {
      router.push(`/create-interaction?lead_id=${leadDetails.lead_id}`);
    }
  };

  const handleDeleteInteraction = async (interactionId: number) => {
    try {
      await deleteInteractionById(`interaction/${interactionId}`);

      setInteractions((prevInteractions) => prevInteractions.filter((interaction) => interaction.id !== interactionId));
    } catch (error) {
      console.error('Error deleting interaction:', error);
    }
  };

  if (!isOpen || !leadDetails) {
    return null;
  }

  return (
    <div className="drawer-backdrop" onClick={handleBackdropClick}>
      <div className="drawer-content">
        <h2>Lead Details</h2>
        <p>Lead ID: {leadDetails.lead_id}</p>
        <p>Lead Name: {leadDetails.lead_name}</p>
        <p>Email: {leadDetails.email}</p>
        <p>Lead Status: {leadDetails.lead_status}</p>
        <p>Source: {leadDetails.source}</p>

        {/* Display Interactions */}
        <div>
          <h3>Interactions from this lead id:</h3>
          {interactions && interactions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {interactions.map((interaction: any) => (
                  <tr key={interaction.id}>
                    <td>{interaction.id}</td>
                    <td>{interaction.interaction_type}</td>
                    <td>{interaction.interaction_date}</td>
                    <td>
                      <button onClick={() => handleDeleteInteraction(interaction.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleUpdateInteraction(interaction.id)}>
                          Update
                        </button>
                    </td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No interactions available.</p>
          )}
        </div>
         {/* Button to create a new interaction */}
         <button onClick={handleCreateInteraction}>Create Interaction</button>

        <button onClick={onClose}>Close</button>
      </div>

      <style jsx>{`
        /* Styling for the drawer */

        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: flex-end; /* Align to the right */
        }

        .drawer-content {
          background: white;
          padding: 20px;
          width: 50%; /* Adjust the width as needed */
          max-width: 600px; /* Set a max-width if desired */
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          height : 100vh;
        }

        /* Styling for the table */

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th,
        td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        th {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default LeadDetailsDrawer;
