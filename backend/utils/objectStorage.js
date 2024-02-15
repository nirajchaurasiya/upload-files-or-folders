const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { readFile } = require("fs/promises");
const fs = require("fs/promises");
const { getFileName } = require("./getFilename.js");

const s3Client = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINTS,
  forcePathStyle: false,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
  },
});

const uploadToSpaces = async (localFilePath, fileType, ACL) => {
  try {
    let spaceName = process.env.SPACES_NAME;

    if (!localFilePath) return null;

    // Read the file content asynchronously
    const fileContent = await readFile(localFilePath);

    // Extract filename = the path
    const filename =
      Date.now() + "-" + localFilePath.slice(12)?.replace(/ /g, "-");
    // const modifiedFilename = filename.replace(/ /g, '-');
    // Initialize S3Client

    const params = {
      Bucket: spaceName,
      Key: `${fileType}/${filename}`,
      Body: fileContent,
      ContentType: fileType,
      ACL: ACL,
    };

    // Upload the file
    await s3Client.send(new PutObjectCommand(params));

    // Construct the URL
    const imageURL = `https://nyc3.digitaloceanspaces.com/${spaceName}/${fileType}/${filename}`;

    // Remove the local file
    await fs.unlink(localFilePath);

    return { url: imageURL };
  } catch (error) {
    console.log(error);
    // Remove the local file in case of an error
    await fs.unlink(localFilePath);

    return null;
  }
};

const deleteFromSpaces = async (URL) => {
  try {
    const key = getFileName(URL);

    let spaceName = process.env.SPACES_NAME;

    // Initialize S3Client

    const params = {
      Bucket: spaceName,
      Key: key,
    };

    // Delete the file
    await s3Client.send(new DeleteObjectCommand(params));

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
module.exports = { deleteFromSpaces, uploadToSpaces };
