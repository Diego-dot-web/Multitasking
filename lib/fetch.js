export async function getTodos() {
  const resp = await fetch(process.env.API_URL);
  const data = await resp.json();

  return data;
}
