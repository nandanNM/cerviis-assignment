import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "../components/ui/use-toast";
import type { ApiResponse, DashboardData } from "../types";



export const pool = async (signal?: AbortSignal): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/stats`, {
      signal
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    const axiosError = error as AxiosError<ApiResponse>;
    throw new Error(
      axiosError.response?.data?.message ?? "Failed to fetch dashboard statistics"
    );
  }
};

const REFRESH_INTERVAL_SECONDS = 60;

export default function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_SECONDS);
  const { toast } = useToast();

  const fetchStats = useCallback(
    async (options: { showToast?: boolean; signal?: AbortSignal } = {}) => {
      const { showToast = false, signal } = options;

      setIsLoading(true);

      try {
        const response = await pool(signal);

        if (response?.data) {
          setData(response.data);
        }

        if (showToast) {
          toast({
            title: "Refreshed",
            description: "Showing latest statistics",
          });
        }

        setCountdown(REFRESH_INTERVAL_SECONDS);
      } catch (error) {
        if (axios.isCancel(error)) return;

        const message =
          error instanceof Error ? error.message : "Failed to fetch statistics";

        toast({ title: "Error", description: message, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchStats({ signal: controller.signal });
    return () => controller.abort();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStats();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1_000);

    return () => clearInterval(timer);
  }, [fetchStats]);

  const handleManualRefresh = useCallback(
    () => fetchStats({ showToast: true }),
    [fetchStats]
  );

  return { data, isLoading, countdown, handleManualRefresh };
}
