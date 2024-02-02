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

interface Interaction {
  id: number;
  interaction_type: string;
  interaction_date: string;
  details: {
    follow_up_date: string;
    priority: string;
  };
  updated_date: string;
}

export const fetchData = async (endpoint: string): Promise<Lead[]> => {
  try {
    const response = await axios.get<Lead[]>(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataById = async (endpoint: string): Promise<Lead> => {
  console.log(endpoint);
  try {
    const response = await axios.get<Lead>(`${API_BASE_URL}/${endpoint}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteLeadDataById = async (endpoint: string): Promise<any> => {
  console.log(endpoint);
  try {
    const response = await axios.delete<Lead>(`${API_BASE_URL}/${endpoint}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateLeadById = async (
  endpoint: string,
  data: any
): Promise<any> => {
  console.log(endpoint);
  try {
    const response = await axios.patch<any>(
      `${API_BASE_URL}/${endpoint}`,
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const fetchInteractionsByLeadId = async (
  endpoint: string
): Promise<Interaction[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching interactions by lead ID:", error);
    throw error;
  }
};

export const createInteraction = async (interactionData: any): Promise<any> => {
  try {
    const response = await axios.post<any>(
      `${API_BASE_URL}/interaction`,
      interactionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating interaction:", error);
    throw error;
  }
};
