import axios from "axios";
import { Schema } from "./types";

const API_BASE_URL = "http://localhost:5001";

export const fetchSchema = async (): Promise<Schema> => {
  try {
    const response = await axios.get<Schema>(`${API_BASE_URL}/api/schema`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schema:", error);
    throw error;
  }
};
