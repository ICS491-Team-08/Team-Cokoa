const fetchImg = (name) => {
  return fetch("https://uj0flxl0te.execute-api.us-east-1.amazonaws.com/prod/s3", {
    method: "POST",
    body: JSON.stringify({
      type: "getUriForGet",
      params: {
        key: name,
      },
    }),
  }).then((res) => res.json());
};

export default fetchImg;
