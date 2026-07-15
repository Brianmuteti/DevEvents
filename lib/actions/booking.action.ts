"use server";
import { Booking } from "@/database";
import connectToDatabase from "../mongodb";

export const createBooking = async ({
    eventId,
    slug,
    email,
}: {
    eventId: string;
    slug: string;
    email: string;
}) => {
    try {
        await connectToDatabase();
        await Booking.create({ eventId, slug, email });
        return { success: true };
    } catch (err) {
        console.log("Booking event failed", err);
        return { success: false };
    }
};
