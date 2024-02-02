// utils/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update with your API base URL

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

export const fetchData = async (endpoint: string): Promise<Lead[]> => {
  try {
    console.log("checking thiss");

    const response = await axios.get<Lead[]>(`${API_BASE_URL}/${endpoint}`);

    console.log("checking this");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
