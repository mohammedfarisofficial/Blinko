import University from "@/modals/University";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";

export const dynamic = "force-dynamic";

// Create University
export const POST = async (request) => {
  const { title } = await request.json();
  if (!title) {
    return NextResponse.json(
      { message: "Title is required!" },
      { status: 400 }
    );
  }

  try {
    await connect();

    // Generate a unique slug
    const slug = await generateUniqueSlug(University, title);

    const newUniversity = new University({ slug, title });

    try {
      const universitySaved = await newUniversity.save();
      return NextResponse.json(universitySaved, { status: 201 });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error
        return NextResponse.json(
          { message: "University with this title already exists!" },
          { status: 409 }
        );
      }
      throw err;
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { message: `Error: ${err.message}` },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connect();
    const universities = await University.find();
    if (!universities) {
      return NextResponse("Universities not found!", { status: 404 });
    }
    return NextResponse(universities, { status: 200 });
  } catch (err) {
    return NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};
