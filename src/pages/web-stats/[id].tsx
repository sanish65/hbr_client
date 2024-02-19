// pages/updateLead.tsx
import { fetchWebsiteDataById, updateLeadById, updateWebsiteById } from '../../utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UpdateWebsite: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [websiteData, setWebsiteData] = useState({
    id: 0,
    name: '',
    status: '',
    url: '',
    logoUrl: '',
    addedAt: '',

  });

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response =  await fetchWebsiteDataById(`web-stats/${id}`);
        const data = await response;
        setWebsiteData(data);
      } catch (error) {
        alert(`Error fetching data: ${error}`);
      }
    };

    if (id) {
      fetchWebsiteData();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateWebsiteById(`web-stats/${id}`,websiteData);

      router.push('/dashboard');
    } catch (error) {
        alert(`Error updating data: ${error}`);
    }
  };

  return (
    <div>
      <h1>Update website details</h1>
      <form>
        <label>
          Website Id:
          <input type="text" value={websiteData.id} readOnly />
        </label>
        <br />
        <label>
        Website Name:
          <input
            type="text"
            value={websiteData.name}
            onChange={(e) => setWebsiteData({ ...websiteData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
        Website Url:
          <input
            type="text"
            value={websiteData.url}
            onChange={(e) => setWebsiteData({ ...websiteData, url: e.target.value })}
          />
        </label>
        <br />
        <label>
        Website Status:
          <input
            type="text"
            value={websiteData.status}
            onChange={(e) => setWebsiteData({ ...websiteData, status: e.target.value })}
          />
        </label>
        <br />
        <label>
        Website Logo Url:
          <input
            type="text"
            value={websiteData.logoUrl}
            onChange={(e) => setWebsiteData({ ...websiteData, logoUrl: e.target.value })}
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleUpdate}>
          Update Website
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

export default UpdateWebsite;
