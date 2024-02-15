import axios from "axios";

export const createFile = async (file, folderName) => {
  console.log(file, folderName);
  try {
    const fd = new FormData();
    if (folderName) {
      console.log(`foldername`);
      fd.append("type", 1);

      fd.append("file", file);
      fd.append("folderName", folderName);
      const response = await axios.post(
        "/backend-url/api/v1/add-file-in-folder",
        fd
      );
      return response.data;
    }
    console.log(`filename`);

    fd.append("file", file);
    fd.append("folderName", folderName);
    fd.append("type", 0);
    const response = await axios.post("/backend-url/api/v1/add-file", fd);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
