import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/app/lib/admin-auth";
import { readSiteContent, validateEntry, writeSiteContent, type ContentEntry, type ContentSection } from "@/app/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

function cleanKey(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim().replace(/[^a-zA-Z0-9/_-]+/g, "-").slice(0, 160);
  return cleaned || fallback;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return forbidden();
  return NextResponse.json(await readSiteContent(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as {
      scope?: "global" | "page";
      pathname?: string;
      pageLabel?: string;
      section?: string;
      sectionLabel?: string;
      entries?: ContentEntry[];
    };
    if (!Array.isArray(body.entries) || body.entries.length === 0 || body.entries.length > 12) {
      return NextResponse.json({ error: "Select at least one valid field to save." }, { status: 400 });
    }
    for (const entry of body.entries) {
      const error = validateEntry(entry);
      if (error) return NextResponse.json({ error }, { status: 400 });
    }

    const content = await readSiteContent();
    const sectionKey = cleanKey(body.section, "general");
    const sectionLabel = typeof body.sectionLabel === "string" && body.sectionLabel.trim() ? body.sectionLabel.trim().slice(0, 120) : "General";
    let sections: Record<string, ContentSection>;

    if (body.scope === "global") {
      sections = content.global.sections;
    } else {
      const pathname = typeof body.pathname === "string" && body.pathname.startsWith("/") ? body.pathname.slice(0, 300) : "/";
      content.pages[pathname] ??= { label: body.pageLabel?.trim().slice(0, 120) || pathname, sections: {} };
      sections = content.pages[pathname].sections;
    }

    sections[sectionKey] ??= { label: sectionLabel, entries: [] };
    for (const entry of body.entries) {
      const index = sections[sectionKey].entries.findIndex((candidate) => candidate.id === entry.id);
      if (index >= 0) sections[sectionKey].entries[index] = entry;
      else sections[sectionKey].entries.push(entry);
    }

    await writeSiteContent(content);
    return NextResponse.json({ success: true, content: await readSiteContent() });
  } catch (error) {
    console.error("Unable to update site content", error);
    return NextResponse.json({ error: "The content could not be saved." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as { ids?: string[] };
    if (!Array.isArray(body.ids) || body.ids.length === 0) return NextResponse.json({ error: "No saved fields were selected." }, { status: 400 });
    const ids = new Set(body.ids.filter((id): id is string => typeof id === "string"));
    const content = await readSiteContent();
    const prune = (sections: Record<string, ContentSection>) => {
      for (const [key, section] of Object.entries(sections)) {
        section.entries = section.entries.filter((entry) => !ids.has(entry.id));
        if (section.entries.length === 0) delete sections[key];
      }
    };
    prune(content.global.sections);
    for (const [pathname, page] of Object.entries(content.pages)) {
      prune(page.sections);
      if (Object.keys(page.sections).length === 0) delete content.pages[pathname];
    }
    await writeSiteContent(content);
    return NextResponse.json({ success: true, content: await readSiteContent() });
  } catch (error) {
    console.error("Unable to reset site content", error);
    return NextResponse.json({ error: "The saved content could not be reset." }, { status: 500 });
  }
}


