import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const folder = formData.get("folder") as string;

  if (!file || !folder) {
    return NextResponse.json(
      { error: "File and folder are required" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const folderPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "images",
    folder
  );

  if (!fs.existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, fileName);

  await writeFile(filePath, buffer);

  return NextResponse.json({
    filePath: `/assets/images/${folder}/${fileName}`,
  });
}
