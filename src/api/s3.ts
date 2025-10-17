async function uploadFileToS3(uploadURL: string, file: File) {
  await fetch(uploadURL, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
}

export { uploadFileToS3 };
