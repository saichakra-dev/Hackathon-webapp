import { NextResponse } from "next/server";
import DB from "@/app/utils/config/DB.js";
import challengeModel from "@/app/utils/models/challengeModel";
import multer from "multer";
import path from "path";
import fs from "fs";

// Connect to the database
const ConnectDb = async () => {
  await DB();
};
ConnectDb();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET a single challenge by ID
export async function GET(req) {
  await ConnectDb();
  const { id } = req.query;
  const challenge = await challengeModel.findById(id);
  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }
  return NextResponse.json(challenge, { status: 200 });
}

// PUT to update a challenge by ID
export async function PUT(req) {
  await ConnectDb();
  const { id } = req.query;
  const uploadSingle = upload.single("image");
  uploadSingle(req, {}, async (err) => {
    if (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    const { name, description, StartData, EndDate, level } = req.body;
    const updatedData = {
      name,
      description,
      StartData,
      EndDate,
      level,
    };
    if (req.file) {
      updatedData.image = req.file.path;
    }
    const updatedChallenge = await challengeModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedChallenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedChallenge, { status: 200 });
  });
}

// DELETE a challenge by ID
export async function DELETE(req) {
  await ConnectDb();
  const { id } = req.query;
  const deletedChallenge = await challengeModel.findByIdAndDelete(id);
  if (!deletedChallenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Challenge deleted successfully" },
    { status: 200 }
  );
}
