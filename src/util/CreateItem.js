export default async function createItem(data) {
  const response = await fetch(
    `http://${process.env.REACT_APP_API_HOST}:5000/create`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        deployment: data.deployment,
      }),
    }
  );

  return response.status;
}
