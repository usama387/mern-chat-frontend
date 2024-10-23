const uploadFile = async (file) => {
  // Instantiate FormData
  const formData = new FormData();

  // Append file and other necessary fields
  formData.append("file", file);
  formData.append("upload_preset", "chat-lounge");

  // Hardcode the Cloudinary name directly in the URL
  const cloudinaryName = "dzgq3so4i";
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/auto/upload`;

  // Make the API request
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  // Parse the JSON response
  const res = await response.json();

  return res;
};

export default uploadFile;
