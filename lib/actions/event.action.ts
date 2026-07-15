"use server";

import { Event } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";

export const getEventBySlug = async (slug: string) => {
    try {
        await connectToDatabase();
        return await Event.findOne({ slug }).lean();
    } catch {
        return null;
    }
};

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectToDatabase();
        const event = await Event.findOne({ slug }).lean();

        if (!event) {
            return [];
        }

        return await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags ?? [] },
        })
            .limit(3)
            .lean();
    } catch {
        return [];
    }
};
