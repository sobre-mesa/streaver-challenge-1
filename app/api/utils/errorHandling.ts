
import { NextResponse } from "next/server";

export const handleError = (caughtError: any) => NextResponse.json({ error: caughtError.message}, { status: 400 });
