import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/doll - Fetch current active LED / doll state from Supabase DB
export async function GET() {
  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase server client not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("golu_state")
      .select("id, doll_id, updated_at")
      .eq("id", 1)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const activeId = data?.doll_id ?? 1;

    return NextResponse.json({
      success: true,
      dollId: activeId,
      ledNumber: activeId,
      updatedAt: data?.updated_at ?? null,
      activeUrl: `/${activeId}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/doll - Update current LED / doll ID from NodeMCU ESP8266 or dashboard
export async function POST(req: NextRequest) {
  try {
    const configuredToken = process.env.DEVICE_TOKEN;
    const deviceTokenHeader = req.headers.get("x-device-token");

    if (configuredToken && deviceTokenHeader && deviceTokenHeader !== configuredToken) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid x-device-token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    // Accept either dollId, doll_id, ledNumber, led_number, or led
    const rawVal =
      body.dollId ??
      body.doll_id ??
      body.ledNumber ??
      body.led_number ??
      body.led;

    const dollId = Number(rawVal);

    if (!dollId || isNaN(dollId) || dollId < 1 || dollId > 8) {
      return NextResponse.json(
        {
          error:
            "Invalid LED number: Must be an integer between 1 and 8 (received: " +
            rawVal +
            ")",
        },
        { status: 400 }
      );
    }

    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase server client not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("golu_state")
      .upsert(
        { id: 1, doll_id: dollId, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      )
      .select("id, doll_id, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Updated to LED / Doll ID: ${dollId}`,
      dollId: data.doll_id,
      ledNumber: data.doll_id,
      updatedAt: data.updated_at,
      activeUrl: `/${data.doll_id}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
