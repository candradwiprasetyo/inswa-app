import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "images",
    "media",
    fileName
  );

  await writeFile(filePath, buffer);

  return NextResponse.json({ filePath: `/assets/images/media/${fileName}` });
}
