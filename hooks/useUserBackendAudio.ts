import { selectUser } from "@/redux/features/UserSlice";
import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";

const env = process.env.NODE_ENV;

export default function useUserBackendAudio () {
  const { apiKey } = useSelector(selectUser);
  
  function genUserBackend () {
    return axios.create({
      baseURL: env==="development" ? "http://localhost:3001/api" : 'https://backend.experai.com/api',
      headers: {
        "Content-Type": "audio/mp3",
        "Authorization": `Bearer ${apiKey}`,
      }
    });
  };

  return genUserBackend() as AxiosInstance;

}