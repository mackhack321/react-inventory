export default async function getAllEntries() {
  const response = await fetch("http://localhost:5000/getall", {
    method: "GET",
    mode: "cors",
  });

  return await response.json();
}
