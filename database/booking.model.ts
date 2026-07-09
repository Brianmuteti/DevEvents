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

    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
        throw new Error("Referenced event does not exist.");
    }
});

// Indexes help common booking lookups stay efficient.
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ email: 1 });

export const Booking: Model<IBooking> =
    mongoose.models.Booking || model<IBooking>("Booking", bookingSchema);
