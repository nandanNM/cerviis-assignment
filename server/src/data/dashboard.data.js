import { getRandom } from "../utils/index.js";

export const dummyUser = {
  id: "user_123",
  name: "Nandan",
  role: "SDE",
};

export const generateDashboardStats = () => {
    return {
        user: dummyUser,
        overview: {
            interviewsGiven: Math.floor(getRandom(5, 20)),
            successRate: `${Math.floor(getRandom(60, 90))}%`,
            avgScore: Math.floor(getRandom(65, 95)),
        },
        performance: {
            errorRate: `${(5 + getRandom(-1, 1)).toFixed(2)}%`,
            lastScore: Math.floor(getRandom(60, 95)),
        },
        timestamp: new Date().toISOString(),
    };
};
