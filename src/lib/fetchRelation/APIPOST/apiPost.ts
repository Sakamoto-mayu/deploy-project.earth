export async function apiPost(query: string, bodyValue: any) {
  let apiOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyValue),
  };
  const res = await fetch(`/api${query}`, apiOptions);
  return res;
}
