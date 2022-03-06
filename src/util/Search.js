export default async function search(searchterm) {
  const response = await fetch(
    `http://${process.env.REACT_APP_API_HOST}:5000/search`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchterm: searchterm,
      }),
    }
  );

  return await response.json();
}
