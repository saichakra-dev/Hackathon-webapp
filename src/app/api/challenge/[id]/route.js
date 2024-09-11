// /pages/api/challenge/[id].js

import { NextResponse } from "next/server";
import DB from "@/app/utils/config/DB.js";
import challengeModel from "@/app/utils/models/challengeModel";

const ConnectDb = async () => {
  if (!DB.isConnected) {
    await DB();
  }
};

export async function GET(request, { params }) {
  await ConnectDb();
  const { id } = params;

  try {
    const challenge = await challengeModel.findById(id);
    if (!challenge) {
      return NextResponse.json(
        { success: false, error: "Challenge not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, challenge }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error fetching challenge" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await ConnectDb();
  const { id } = params;
  const data = await request.json();

  try {
    const updatedChallenge = await challengeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedChallenge) {
      return NextResponse.json(
        { success: false, error: "Challenge not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, challenge: updatedChallenge },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error updating challenge" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await ConnectDb();
  const { id } = params;

  try {
    const deletedChallenge = await challengeModel.findByIdAndDelete(id);
    if (!deletedChallenge) {
      return NextResponse.json(
        { success: false, error: "Challenge not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, response: "Challenge deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error deleting challenge" },
      { status: 500 }
    );
  }
}
