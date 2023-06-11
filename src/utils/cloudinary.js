const uploadImageToCloudinary = async (profile) => {
 const data = new FormData();
 data.append("file", profile);
 data.append("upload_preset", "chat-zone");
 data.append("cloud_name", "muhdhanish");
 try {
  const response = await fetch(
   "https://api.cloudinary.com/v1_1/muhdhanish/image/upload",
   {
    method: "POST",
    body: data,
   }
  );
  const res = await response.json();
  return res.url.toString();
 } catch (error) {
  console.log(error);
  throw new Error("Failed to upload image to Cloudinary");
 }
};

export default uploadImageToCloudinary;