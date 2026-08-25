import { NextResponse } from "next/server";
import { readSiteContent } from "@/app/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await readSiteContent();
    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch {
    return NextResponse.json(
      { version: 1, updatedAt: null, global: { sections: {} }, pages: {} },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
