import axios from "axios";

export const getFileData = async (fileName) => {
  try {
    const response = await axios.get(
      `/backend-url/api/v1/get-file/${fileName}`
    );
    const file = response.data;
    return file;
  } catch (error) {
    console.log(error.message || "Something went wrong");
    return null;
  }
};
