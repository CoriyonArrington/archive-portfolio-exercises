// middleware.ts
import { NextResponse } from "next/server";

// This root‐level file isn’t used by Next when you have app/middleware.ts,
// but updating it keeps your lint suite happy if it ever gets picked up.
export function middleware() {
  console.log("Middleware is running...");
  return NextResponse.next();
}
