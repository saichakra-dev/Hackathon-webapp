import { NextResponse } from "next/server";
import DB from "@/app/utils/config/DB.js";
import challengeModel from "@/app/utils/models/challengeModel";
import path from "path";
import { promises as fs } from "fs"; // Import the promises API

// Connect to the database
const ConnectDb = async () => {
  await DB();
};
ConnectDb();

// GET all challenges
export async function GET() {
  await ConnectDb();
  const challenges = await challengeModel.find({});
  return NextResponse.json(challenges, { status: 200 });
}

// POST a new challenge
export async function POST(request) {
  await ConnectDb();

  const data = await request.formData();
  const image = data.get("image");
  const name = data.get("name");
  const description = data.get("description");
  const StartData = data.get("StartData");
  const EndDate = data.get("EndDate");
  const level = data.get("level");

  // Validate required fields
  if (!name || !description || !StartData || !EndDate || !level) {
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
    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });
    // Write the file
    await fs.writeFile(imagePath, buffer);
    const challenge = new challengeModel({
      name: name,
      image: `/uploads/${image.name}`,
      description: description,
      StartData: StartData,
      EndDate: EndDate,
      level: level,
    });
    await challenge.save();
    console.log("Challenge saved successfully");
    return NextResponse.json({
      response: "Successfully uploaded",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
