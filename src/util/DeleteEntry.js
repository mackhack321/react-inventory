export default async function deleteEntry(id) {
  const response = await fetch("http://localhost:5000/remove", {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  });

  return response.status;
}
