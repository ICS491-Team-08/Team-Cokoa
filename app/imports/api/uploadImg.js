function extractFileType(file) {
  const temp = file.name.split(".");
  const type = "." + temp[temp.length - 1];

  return type;
}

function createImg(file, id) {
  const type = extractFileType(file);
  const newFile = new File([file], id + type, {
    type: file.type,
  });

  return newFile;
}

async function uploadImg(file) {
  await fetch(
    "https://uj0flxl0te.execute-api.us-east-1.amazonaws.com/prod/s3",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getUriForPut",
        params: {
          fileName: file.name,
          fileType: file.type,
        },
      }),
    }
  )
    .then((res) => res.json())
    .then((url) => {
      fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc
        headers: new Headers({
          "Content-Type": file.type,
        }),
        body: file, // body data type must match "Content-Type" header
      });
    });
}

export { extractFileType, uploadImg, createImg };
