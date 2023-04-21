export default async function FetchForPost(data: {}, url: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`/api/${url}`, options);
  console.log("fetchレスポンス", response);
  const result = await response.json();
  console.log("fetchリザルト", result);
  return result;
}
// async関数の戻り値は強制的promiseの形になる。
