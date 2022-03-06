export default async function deploy(data) {
  console.log(data);
  const response = await fetch(
    `http://${process.env.REACT_APP_API_HOST}:5000/deploy`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        deployment: data.deployment,
      }),
    }
  );

  return response.status;
}
