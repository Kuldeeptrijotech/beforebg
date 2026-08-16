import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/app/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);

function forbidden() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

function validSignature(buffer: Buffer, extension: string) {
  if (extension === "jpg") return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === "png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === "webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  if (extension === "svg") {
    const source = buffer.toString("utf8").replace(/^\uFEFF/, "");
    return /<svg[\s>]/i.test(source) && !/<(?:script|iframe|object|embed|foreignObject)\b|\bon\w+\s*=|javascript:/i.test(source);
  }
  return false;
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (!file.size || file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be smaller than 5 MB." }, { status: 400 });

    const extension = allowedTypes.get(file.type.toLowerCase());
    if (!extension) return NextResponse.json({ error: "Use a JPG, JPEG, PNG, SVG, or WebP image." }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validSignature(buffer, extension)) return NextResponse.json({ error: "The selected file is not a valid or safe image." }, { status: 400 });

    const originalBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "image";
    const filename = `${originalBase}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
    const uploadDirectory = path.join(process.cwd(), "public", "assets", "uploads");
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(path.join(uploadDirectory, filename), buffer, { flag: "wx" });
    return NextResponse.json({ success: true, path: `/assets/uploads/${filename}`, filename });
  } catch (error) {
    console.error("Unable to upload image", error);
    return NextResponse.json({ error: "The image could not be uploaded. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as { path?: string };
    if (typeof body.path !== "string" || !body.path.startsWith("/assets/uploads/")) {
      return NextResponse.json({ error: "Invalid upload path." }, { status: 400 });
    }
    const filename = path.basename(body.path);
    const target = path.join(process.cwd(), "public", "assets", "uploads", filename);
    await fs.unlink(target).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to discard image", error);
    return NextResponse.json({ error: "The staged image could not be removed." }, { status: 500 });
  }
}
