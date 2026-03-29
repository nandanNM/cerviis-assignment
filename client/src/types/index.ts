export interface DashboardData {
  user: {
    id: string;
    name: string;
    role: string;
  };
  overview: {
    interviewsGiven: number;
    successRate: string;
    avgScore: number;
  };
  performance: {
    errorRate: string;
    lastScore: number;
  };
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
