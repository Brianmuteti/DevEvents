import { Event, type IEvent } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface RouteContext {
    params: Promise<{ slug?: string | string[] }>;
}

function isValidSlug(value: unknown): value is string {
    return (
        typeof value === "string" &&
        value.trim().length > 0 &&
        slugPattern.test(value.trim())
    );
}

// Fetch a single event by its URL-friendly slug.
export async function GET(_request: Request, context: RouteContext) {
    try {
        const { slug } = await context.params;
        const normalizedSlug =
            typeof slug === "string" ? slug.trim() : undefined;

        if (!isValidSlug(normalizedSlug)) {
            return NextResponse.json(
                { message: "A valid slug is required." },
                { status: 400 },
            );
        }

        await connectToDatabase();

        const event = await Event.findOne({
            slug: normalizedSlug,
        }).lean<IEvent>();

        if (!event) {
            return NextResponse.json(
                { message: `No event found for slug "${normalizedSlug}".` },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { message: "Event fetched successfully.", event },
            { status: 200 },
        );
    } catch (error) {
        console.error("Failed to fetch event:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch event.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
