// app/middleware.ts
import { NextResponse } from "next/server";

// Middleware runs on every request; we don't need the `request` object here,
// so we omit it entirely to satisfy @typescript-eslint/no-unused-vars.
export function middleware() {
  console.log("Middleware is running...");
  return NextResponse.next();
}
