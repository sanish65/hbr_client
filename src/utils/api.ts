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
  interaction_count: string;
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

export const Signup = async (data: any): Promise<any> => {
  try {
    console.log(`${API_BASE_URL}/authZero/signup`);
    const response = await axios.post(`${API_BASE_URL}/authZero/signup`, data);
    return response.data;
  } catch (error) {
    console.error("Error in signup:", error);
    throw error;
  }
};

export const Login = async (data: { sub: string }): Promise<any> => {
  try {
    console.log(`${API_BASE_URL}/authZero/login`);
    const response = await axios.post(`${API_BASE_URL}/authZero/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

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
  try {
    const response = await axios.get<Lead>(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteLeadDataById = async (endpoint: string): Promise<any> => {
  try {
    const response = await axios.delete<Lead>(`${API_BASE_URL}/${endpoint}`);
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
  try {
    const response = await axios.patch<any>(
      `${API_BASE_URL}/${endpoint}`,
      data
    );
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

export const deleteInteractionById = async (
  deleteDetail: string
): Promise<void> => {
  try {
    const response = await axios.delete<any>(`${API_BASE_URL}/${deleteDetail}`);
    return response.data;
  } catch (error) {
    console.error("Error creating interaction:", error);
    throw error;
  }
};

export const fetchInteractionById = async (url: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching interaction by ID");
  }
};

export const updateInteraction = async (data: any): Promise<void> => {
  try {
    const response = await axios.patch<any>(
      `${API_BASE_URL}/interaction/${data.id}`,
      data
    );

    return response.data;
  } catch (error) {
    throw new Error("Error updating interaction");
  }
};

// Function to fetch leads per source
export const fetchLeadsPerSource = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/source`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leads per source:", error);
    throw error;
  }
};

// Function to fetch leads per status
// export const fetchLeadsPerStatus = async (): Promise<any[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/leads/status`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching leads per status:", error);
//     throw error;
//   }
// };

// export const fetchLeadsPerSourceWithStatus = async (): Promise<any[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/leads`);
//     const leads = await response.json();

//     const leadsPerSourceWithStatus = leads.reduce(
//       (
//         acc: { [x: string]: { statuses: any[] } },
//         lead: { source: any; lead_status: any }
//       ) => {
//         const source = lead.source;

//         if (!acc[source]) {
//           acc[source] = { source, statuses: [] };
//         }

//         acc[source].statuses.push(lead.lead_status);
//         return acc;
//       },
//       {}
//     );

//     const leadsPerSourceArray = Object.values(leadsPerSourceWithStatus);

//     return leadsPerSourceArray;
//   } catch (error) {
//     console.error("Error fetching leads per source with status:", error);
//     throw error;
//   }
// };
