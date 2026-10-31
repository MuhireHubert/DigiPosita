import { NextResponse } from "next/server";
import {
  authenticateLoginAlias,
  parseLoginAliases,
} from "@/lib/login-identifiers";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store, private" };
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Request not allowed." },
      { status: 403, headers },
    );
  if (
    !request.headers.get("content-type")?.includes("application/json") ||
    Number(request.headers.get("content-length") || 0) > 2048
  )
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers },
    );
  try {
    const text = await request.text();
    if (text.length > 2048) throw new Error("Invalid request");
    const { identifier, password } = JSON.parse(text);
    if (
      typeof identifier !== "string" ||
      identifier.length > 200 ||
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 128
    )
      return NextResponse.json(
        { error: "Unable to sign in. Check your details." },
        { status: 401, headers },
      );
    if (
      !process.env.LOGIN_ALIASES_JSON ||
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    )
      return NextResponse.json(
        {
          error:
            "Linked username and phone sign-in is not available yet. Use your account email.",
        },
        { status: 503, headers },
      );
    const aliases = parseLoginAliases(process.env.LOGIN_ALIASES_JSON);
    const emulator =
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true"
        ? process.env.FIREBASE_AUTH_EMULATOR_HOST
        : undefined;
    const endpoint = emulator
      ? `http://${emulator}/identitytoolkit.googleapis.com`
      : "https://identitytoolkit.googleapis.com";
    const result = await authenticateLoginAlias(
      identifier,
      password,
      aliases,
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      endpoint,
    );
    return result
      ? NextResponse.json(result, { headers })
      : NextResponse.json(
          { error: "Unable to sign in. Check your details." },
          { status: 401, headers },
        );
  } catch {
    return NextResponse.json(
      { error: "Sign-in is temporarily unavailable. Please try again." },
      { status: 503, headers },
    );
  }
}
