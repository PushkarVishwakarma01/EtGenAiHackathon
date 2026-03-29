import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const analyzeStock = async (symbol) => {
    const res = await fetch(`http://localhost:8080/api/analyze?symbol=${symbol}`);
    return await res.json();
};

export const getAlerts = async () => {
    const res = await fetch(`http://localhost:8080/api/alerts`);
    return await res.json();
};

export const getChartData = async (symbol) => {
  const res = await fetch(`http://localhost:8080/api/chart?symbol=${symbol}`);
  return await res.json();
};
