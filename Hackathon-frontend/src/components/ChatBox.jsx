import { useState } from "react";
import { analyzeStock } from "../services/api";
import StockChart from "./StockChart";
import { getChartData } from "../services/api";

const ChatBox = ({ setChartData }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chartData] = useState([]);

  const handleSend = async () => {
    if (!input) return;

    setChartData([]);

    try {
      const prices = await getChartData(input);
      setChartData(prices);
    } catch (err) {
      console.log("Chart fetch failed");
    }

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    try {
      setLoading(true);
      const response = await analyzeStock(input);
      setLoading(false);

      setMessages([...newMessages, { type: "bot", data: response }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { type: "bot", text: "Error fetching data" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-[450px]">
      {/* 🔹 Messages (scrollable ONLY) */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === "user" ? (
              <div className="bg-blue-500 text-white p-2 rounded-lg ml-auto max-w-[70%]">
                {msg.text}
              </div>
            ) : (
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p>
                  <strong>📊 Stock:</strong> {msg.data.stock}
                </p>
                <p>
                  <strong>📈 Signal:</strong> {msg.data.signal}
                </p>
                <p>
                  <strong>💡 Decision:</strong> {msg.data.decision}
                </p>
                <p>
                  <strong>🧠 Insight:</strong> {msg.data.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Enter stock (e.g., TCS)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
