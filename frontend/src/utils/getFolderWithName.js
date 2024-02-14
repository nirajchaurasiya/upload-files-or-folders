import axios from "axios";

export const getFolderData = async (folderName) => {
  try {
    const response = await axios.get(
      `/backend-url/api/v1/get-folder/${folderName}`
    );
    const folder = response.data;
    return folder;
  } catch (error) {
    console.log(error.message || "Something went wrong");
    return null;
  }
};
