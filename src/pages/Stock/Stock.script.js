import axios from "axios";

// Example logic for managing stock data
export const fetchStockData = async () => {
  // Fetch stock data from an API or database
  const response = await axios.get("/api/stock");
  return response.data;
};

export const addStockItem = async (item) => {
  // Add a new stock item
  const response = await axios.post("/api/stock", item, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const editStockItem = async (id, updatedItem) => {
  // Edit an existing stock item
  const response = await axios.put(`/api/stock/${id}`, updatedItem, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteStockItem = async (id) => {
  // Delete a stock item
  await axios.delete(`/api/stock/${id}`);
};
