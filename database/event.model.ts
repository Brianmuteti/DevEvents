import mongoose, { model, Schema, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function normalizeDate(value: string): string {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Date must be a valid ISO string or date-like value.");
    }

    return parsedDate.toISOString();
}

function normalizeTime(value: string): string {
    const trimmedValue = value.trim();
    const match = trimmedValue.match(/^(\d{1,2})(?::(\d{2}))?\s*([ap]m)?$/i);

    if (!match) {
        throw new Error("Time must follow HH:MM or HH:MM AM/PM format.");
    }

    const hours = Number.parseInt(match[1], 10);
    const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
    const period = match[3]?.toLowerCase();

    if (minutes > 59) {
        throw new Error("Time contains an invalid minute value.");
    }

    if (period && (hours < 1 || hours > 12)) {
        throw new Error("Time contains an invalid hour value for 12-hour format.");
    }

    if (!period && (hours < 0 || hours > 23)) {
        throw new Error("Time contains an invalid hour or minute value.");
    }

    const normalizedHours =
        period === "pm" && hours !== 12
            ? hours + 12
            : period === "am" && hours === 12
              ? 0
              : hours;

    return `${String(normalizedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: { type: String, unique: true, trim: true, lowercase: true },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        overview: {
            type: String,
            required: [true, "Overview is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },
        venue: {
            type: String,
            required: [true, "Venue is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },
        time: {
            type: String,
            required: [true, "Time is required"],
            trim: true,
        },
        mode: {
            type: String,
            required: [true, "Mode is required"],
            trim: true,
        },
        audience: {
            type: String,
            required: [true, "Audience is required"],
            trim: true,
        },
        agenda: { type: [String], required: [true, "Agenda is required"] },
        organizer: {
            type: String,
            required: [true, "Organizer is required"],
            trim: true,
        },
        tags: { type: [String], required: [true, "Tags are required"] },
    },
    {
        timestamps: true,
        strict: true,
    },
);

// Keep slug URLs friendly and only refresh them when the title changes.
eventSchema.pre("save", async function (this: IEvent) {
    const requiredFields: Array<[string, string | undefined]> = [
        ["title", this.title],
        ["description", this.description],
        ["overview", this.overview],
        ["image", this.image],
        ["venue", this.venue],
        ["location", this.location],
        ["date", this.date],
        ["time", this.time],
        ["mode", this.mode],
        ["audience", this.audience],
        ["organizer", this.organizer],
    ];

    for (const [fieldName, value] of requiredFields) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error(`${fieldName} is required and cannot be empty.`);
        }
    }

    if (!Array.isArray(this.agenda) || this.agenda.length === 0) {
        throw new Error("Agenda must contain at least one item.");
    }

    if (!Array.isArray(this.tags) || this.tags.length === 0) {
        throw new Error("Tags must contain at least one item.");
    }

    this.agenda = this.agenda.map((item) => item.trim()).filter(Boolean);
    this.tags = this.tags.map((item) => item.trim()).filter(Boolean);

    if (this.isModified("title") || !this.slug) {
        this.slug = slugify(this.title);
    }

    // Normalize date and time values so downstream consumers receive consistent data.
    this.date = normalizeDate(this.date);
    this.time = normalizeTime(this.time);
});

eventSchema.index({ slug: 1 }, { unique: true });

export const Event: Model<IEvent> =
    mongoose.models.Event || model<IEvent>("Event", eventSchema);
