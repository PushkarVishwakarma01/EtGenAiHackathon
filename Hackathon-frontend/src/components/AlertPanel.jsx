import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await getAlerts();
      setAlerts(data);
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts yet</p>
      ) : (
        alerts.map((alert, index) => (
          <div
            key={index}
            className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm"
          >
            <p className="font-semibold">{alert.symbol}</p>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AlertPanel;
