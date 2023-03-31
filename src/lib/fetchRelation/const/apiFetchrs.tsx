// Post
export const Post = async (postValue: any, query: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: `${process.env["DB_KEY"]}`,
      Authorization: `Bearer ${process.env["DB_KEY"]}`,
    },
    body: JSON.stringify(postValue),
  };
  const res = await fetch(`${process.env["DB_URL"]}${query}`, options);
  return res.json();
};

// Get
export const Get = async (query: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: `${process.env["DB_KEY"]}`,
      Authorization: `Bearer ${process.env["DB_KEY"]}`,
    },
  };
  const res = await fetch(`${process.env["DB_URL"]}${query}`, options);
  return res.json();
};

// Delete
export const Delete = async (query: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: `${process.env["DB_KEY"]}`,
      Authorization: `Bearer ${process.env["DB_KEY"]}`,
    },
  };
  const res = await fetch(`${process.env["DB_URL"]}${query}`, options);
  return res.json();
};

// Patch
export const Patch = async (patchValue: any, query: string) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: `${process.env["DB_KEY"]}`,
      Authorization: `Bearer ${process.env["DB_KEY"]}`,
    },
    body: JSON.stringify(patchValue),
  };
  const res = await fetch(`${process.env["DB_URL"]}${query}`, options);
  return res.json();
};
