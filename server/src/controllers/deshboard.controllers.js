import { delay, getRandom } from "../utils/index.js";
import { generateDashboardStats } from "../data/dashboard.data.js";

export const getDeshboardStats = async (req, res) => {
    try {
        await delay(getRandom(500, 2000));

        const data = generateDashboardStats();

        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            data
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};
