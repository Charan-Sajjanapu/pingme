export const fetchVivirApi = async (): Promise<string> => {
  const response = await fetch("https://amruthaha.in/vivir/api/");
  if (response.ok) {
    return await response.text();
  }
  throw new Error("Failed to fetch data from /vivir/api/");
};
