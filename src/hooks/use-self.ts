"use client";
import { selfAPI } from "@/lib/api";
import { USER } from "@/types";
import { createAuthenticatedAxiosInstance } from "@/utils/protected-axios";
import { useState, useEffect } from "react";

const useGetSelfInfo = (
  token: string,
  isReloaded: boolean,
  setIsReloaded: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSessionExpired: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [data, setData] = useState<USER | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`${selfAPI}`);

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setData(response.data.data);
        console.log(response.data.data);
      } catch (err: any) {

        if (err && err.response.status == 401) {
          setIsSessionExpired(true);
        }
        setError(err);
        setData(null);
      } finally {
        setIsReloaded(false);
        setLoading(false);
      }
    };

    if (isReloaded) {
      fetchData();
    }
  }, [isReloaded]);

  return { data, loading, error };
};

export default useGetSelfInfo;