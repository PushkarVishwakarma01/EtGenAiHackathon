import { useState } from "react"; 

import ChatBox from "../components/ChatBox";
import AlertPanel from "../components/AlertPanel";
import StockChart from "../components/StockChart";

const Dashboard = () => { 

  const [chartData, setChartData] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">
        📊 ET Smart Investor AI
      </h1>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* LEFT → Chat */}
        <div className="bg-white rounded-2xl shadow p-4 h-[500px]">
          <h2 className="text-xl font-semibold mb-3">
            💬 AI Investor Chat
          </h2>

          {/* ✅ FIX 3: pass setter */}
          <ChatBox setChartData={setChartData} />
        </div>

        {/* RIGHT → Chart + Alerts */}
        <div className="flex flex-col gap-4">

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow p-4 h-[250px]">
            <h2 className="text-lg font-semibold mb-2">
              📊 Price Trend
            </h2>

            {chartData.length > 0 ? (
              <StockChart prices={chartData} />
            ) : (
              <p className="text-gray-400">No chart data</p>
            )}
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-2xl shadow p-4 h-[230px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">
              🚨 Market Alerts
            </h2>
            <AlertPanel />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;