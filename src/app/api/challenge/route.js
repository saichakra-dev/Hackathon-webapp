import { NextResponse } from "next/server";
import DB from "@/app/utils/config/DB.js";
import challengeModel from "@/app/utils/models/challengeModel";
import path from "path";
import { promises as fs } from "fs";

// Connect to the database
const ConnectDb = async () => {
  if (!DB.isConnected) {
    await DB();
  }
};

// GET all challenges
export async function GET() {
  await ConnectDb();
  try {
    const challenges = await challengeModel.find({});
    return NextResponse.json({ success: true, challenges }, { status: 200 });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching challenges" },
      { status: 500 }
    );
  }
}

// POST a new challenge
export async function POST(request) {
  await ConnectDb();
  const data = await request.formData();
  const image = data.get("image");
  const name = data.get("name");
  const description = data.get("description");
  const StartDate = data.get("StartDate");
  const EndDate = data.get("EndDate");
  const level = data.get("level");

  if (!name || !description || !StartDate || !EndDate || !level) {
    return NextResponse.json({
      success: false,
      error: "All fields are required",
    });
  }

  const bufferData = await image.arrayBuffer();
  const buffer = Buffer.from(bufferData);
  const imagePath = path.join(process.cwd(), "public", "uploads", image.name);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(imagePath, buffer);

    const challenge = new challengeModel({
      name,
      image: `/uploads/${image.name}`, // Fixed syntax error here
      description,
      StartDate,
      EndDate,
      level,
    });
    await challenge.save();

    return NextResponse.json({
      success: true,
      response: "Successfully uploaded",
    });
  } catch (error) {
    console.error("Error uploading challenge:", error);
    return NextResponse.json({
      success: false,
      error: "Error uploading challenge",
    });
  }
}
