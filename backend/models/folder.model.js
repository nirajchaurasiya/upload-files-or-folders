const mongoose = require("mongoose");
const folderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    files: [
      {
        fileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File",
          required: true,
        },
      },
    ],
    folders: [
      {
        folderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Folder",
          required: true,
        },
      },
    ],
    type: {
      type: Number,
      default: 0,
      // 0, 1 => 0 for Homepage and 1 for inside a folder
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Folder", folderSchema);
