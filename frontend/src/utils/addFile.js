import axios from "axios";

export const createFile = async (title, folderName) => {
  console.log(title, folderName);
  try {
    if (folderName) {
      console.log(`foldername`);
      const response = await axios.post(
        "/backend-url/api/v1/add-file-in-folder",
        {
          title,
          folderName,
          type: 1,
        }
      );
      return response.data;
    }
    console.log(`filename`);
    const response = await axios.post("/backend-url/api/v1/add-file", {
      title,
      folderName,
      type: 0,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
