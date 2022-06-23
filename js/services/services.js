const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

const GetResourse = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export { postData };
export { GetResourse };
