import mongoose, {
    model,
    Schema,
    type Document,
    type Model,
    type Types,
} from "mongoose";
import { Event } from "./event.model";

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    slug: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: [true, "eventId is required"],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
    },
    {
        timestamps: true,
        strict: true,
    },
);

// Fast lookup by event and reliable validation of the referenced record.
bookingSchema.pre("save", async function (this: IBooking) {
    if (!this.eventId) {
        throw new Error("eventId is required.");
    }

    if (!this.slug) {
        throw new Error("slug is required.");
    }

    const eventExists = await Event.exists({
        _id: this.eventId,
        slug: this.slug,
    });

    if (!eventExists) {
        throw new Error(
            "Referenced event does not exist or slug does not match.",
        );
    }
});

// Indexes help common booking lookups stay efficient.
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ email: 1 });

export const Booking: Model<IBooking> =
    mongoose.models.Booking || model<IBooking>("Booking", bookingSchema);
