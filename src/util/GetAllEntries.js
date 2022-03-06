export default async function getAllEntries() {
  const response = await fetch(
    `http://${process.env.REACT_APP_API_HOST}:5000/getall`,
    {
      method: "GET",
      mode: "cors",
    }
  );

  return await response.json();
}
