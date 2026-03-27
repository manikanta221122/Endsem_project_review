export const loadData = () => {
  const data = localStorage.getItem("reportData");
  return data ? JSON.parse(data) : [];
};

export const saveData = (data) => {
  localStorage.setItem("reportData", JSON.stringify(data));
};