const app = require("./app");
const fileSchema = require("./models/file.model");
const folderSchema = require("./models/folder.model");
const PORT = process.env.PORT;

app.post("/api/v1/add-file", async (req, res) => {
  try {
    const { title } = req.body;
    let type = req.body.type || 0;
    if (!title) {
      return res.status(400).json({
        success: false,
        msg: "Type or Title is undefined",
      });
    }
    const isFileTitleExists = await fileSchema.findOne({
      title: title?.toLowerCase()?.trim(),
    });

    if (isFileTitleExists) {
      return res.status(400).json({
        success: false,
        msg: "File with Title already exists",
      });
    }

    await fileSchema.create({
      title,
      type,
    });

    const getAllFiles = await fileSchema.find();

    return res.status(200).json({
      success: true,
      data: getAllFiles,
      msg: "File added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error?.message || "Something went wrong while adding the file",
    });
  }
});

app.get("/api/v1/get-files", async (req, res) => {
  try {
    const getAllFiles = await fileSchema.find();
    let filteredFile = [];
    getAllFiles.forEach((e) => {
      if (e.type === 0) {
        filteredFile.push(e);
      }
    });
    return res.status(200).json({
      success: true,
      data: filteredFile,
      msg: "Files retrieved successfully",
    });
  } catch (error) {}
});

app.post("/api/v1/add-folder", async (req, res) => {
  try {
    const { title } = req.body;
    let type = req.body.folderName ? 1 : 0;
    if (!title) {
      return res.status(400).json({
        success: false,
        msg: "Type or Title is undefined",
      });
    }

    await folderSchema.create({
      title,
      type,
    });

    const getAllFolders = await folderSchema.find();

    return res.status(200).json({
      success: true,
      data: getAllFolders,
      msg: "Folder added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error?.message || "Something went wrong while adding the file",
    });
  }
});

app.get("/api/v1/get-folders", async (req, res) => {
  try {
    const getAllFiles = await folderSchema.find();

    let filteredFolder = [];

    getAllFiles.forEach((e) => {
      if (e?.type === 0) {
        filteredFolder.push(e);
      }
    });

    return res.status(200).json({
      success: true,
      data: filteredFolder,
      msg: "Files retrieved successfully",
    });
  } catch (error) {}
});

app.get("/api/v1/get-folder/:folderName", async (req, res) => {
  try {
    const { folderName } = req.params;

    const getFolder = await folderSchema.aggregate([
      { $match: { title: folderName } },
      {
        $lookup: {
          from: "folders", // Assuming your collection name is "folders"
          localField: "folders.folderId",
          foreignField: "_id",
          as: "foldersDetails",
        },
      },
      {
        $lookup: {
          from: "files", // Assuming your collection name is "files"
          localField: "files.fileId",
          foreignField: "_id",
          as: "filesDetails",
        },
      },
      {
        $addFields: {
          folders: {
            $map: {
              input: "$folders",
              as: "folder",
              in: {
                $mergeObjects: [
                  "$$folder",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$foldersDetails",
                          cond: {
                            $eq: ["$$this._id", "$$folder.folderId"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
          files: {
            $map: {
              input: "$files",
              as: "file",
              in: {
                $mergeObjects: [
                  "$$file",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$filesDetails",
                          cond: {
                            $eq: ["$$this._id", "$$file.fileId"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      { $project: { foldersDetails: 0, filesDetails: 0 } }, // Exclude details if not needed
    ]);

    if (getFolder && getFolder.length > 0) {
      return res.status(200).json({
        success: true,
        data: getFolder[0],
        msg: "Files retrieved successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Folder not found",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

app.get("/api/v1/get-file/:fileName", async (req, res) => {
  try {
    const { fileName } = req.params;

    const getFile = await fileSchema.findOne({ title: fileName });

    return res.status(200).json({
      success: true,
      data: getFile,
      msg: "Files retrieved successfully",
    });
  } catch (error) {}
});

app.post("/api/v1/add-folder-in-folder", async (req, res) => {
  try {
    const { title, folderName } = req.body;

    let type = folderName ? 1 : 0;
    if (!title) {
      return res.status(400).json({
        success: false,
        msg: "Type or Title is undefined",
      });
    }

    const folder = await folderSchema.findOne({
      title: folderName?.toLowerCase()?.trim(),
    });

    if (!folder) {
      return res.status(400).json({
        success: false,
        msg: "We couldn't find the folder to store",
      });
    }

    const create_folder = await folderSchema.create({
      title,
      type,
    });

    await folderSchema.findByIdAndUpdate(
      folder?._id,
      {
        $addToSet: {
          folders: {
            folderId: create_folder?._id,
          },
        },
      },
      {
        new: true,
      }
    );

    const getAllFolders = await folderSchema.find();
    return res.status(200).json({
      success: true,
      data: getAllFolders,
      msg: "Folder added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error?.message || "Something went wrong while adding the file",
    });
  }
});

app.post("/api/v1/add-file-in-folder", async (req, res) => {
  try {
    const { title, folderName } = req.body;

    let type = folderName ? 1 : 0;
    if (!title) {
      return res.status(400).json({
        success: false,
        msg: "Type or Title is undefined",
      });
    }
    const folder = await folderSchema.findOne({ title: folderName });

    if (!folder) {
      return res.status(400).json({
        success: false,
        msg: "We couldn't find the folder to store",
      });
    }

    const create_file = await fileSchema.create({
      title,
      type,
    });

    await folderSchema.findByIdAndUpdate(
      folder?._id,
      {
        $addToSet: {
          files: {
            fileId: create_file?._id,
          },
        },
      },
      {
        new: true,
      }
    );

    const getAllFolders = await folderSchema.find();
    return res.status(200).json({
      success: true,
      data: getAllFolders,
      msg: "Folder added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error?.message || "Something went wrong while adding the file",
    });
  }
});
app.listen(PORT, () => {});
