"use client";
import { getMachinesAPI, selfAPI } from "@/lib/api";
import { MACHINE, USER } from "@/types";
import { createAuthenticatedAxiosInstance } from "@/utils/protected-axios";
import { useState, useEffect } from "react";

const useGetMachines = (
  token: string,
  isReloaded: boolean,
  setIsReloaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [data, setData] = useState<MACHINE[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`${getMachinesAPI}`);

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setData(response.data);
        console.log(response.data);
      } catch (err: any) {
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

export default useGetMachines;