import axios from "axios";

export const addFolder = async (title, folderName) => {
  try {
    if (folderName) {
      const response = await axios.post(
        "/backend-url/api/v1/add-folder-in-folder",
        {
          title,
          folderName,
        }
      );
      console.log(`response `, response.data);
      return response.data;
    }
    const response = await axios.post("/backend-url/api/v1/add-folder", {
      title,
      folderName,
    });
    console.log(`response2 `, response.data);
    return response.data;
  } catch (error) {
    console.log(error?.message);
    return null;
  }
};
