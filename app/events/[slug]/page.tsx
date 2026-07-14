import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
    icon,
    alt,
    label,
}: {
    icon: string;
    alt: string;
    label: string;
}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
);

const EventAgenda = ({ agendaItems: item }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {item.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div key={tag} className="pill">
                {tag}
            </div>
        ))}
    </div>
);

const EventDetail = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {
        event: {
            description,
            image,
            overview,
            date,
            time,
            location,
            mode,
            agenda,
            audience,
            organizer,
            tags,
        },
    } = await request.json();
    if (!description) return notFound();
    const formatDate = (value: string) => {
        if (!value) return "";

        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return value;
        }

        const parsedDate = new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
            return value;
        }

        return parsedDate.toISOString().slice(0, 10);
    };
    const bookings = 10;
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                {/* Event details content */}
                <div className="content">
                    <Image
                        src={image}
                        alt="Event Banner"
                        width={800}
                        height={800}
                        className="banner"
                    />
                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem
                            icon="/icons/calendar.svg"
                            alt="Calendar"
                            label={formatDate(date)}
                        />
                        <EventDetailItem
                            icon="/icons/clock.svg"
                            alt="Clock"
                            label={time}
                        />
                        <EventDetailItem
                            icon="/icons/pin.svg"
                            alt="Location"
                            label={location}
                        />
                        <EventDetailItem
                            icon="/icons/mode.svg"
                            alt="Mode"
                            label={mode}
                        />
                        <EventDetailItem
                            icon="/icons/audience.svg"
                            alt="Audience"
                            label={audience}
                        />
                    </section>
                    <EventAgenda agendaItems={agenda} />
                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTags tags={tags} />
                </div>
                {/* Booking form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked
                                their spot!
                            </p>
                        ) : (
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}
                        <BookEvent />
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 &&
                        similarEvents.map((similarEvent: IEvent) => (
                            <EventCard
                                key={String(similarEvent._id)}
                                title={similarEvent.title}
                                image={similarEvent.image}
                                slug={similarEvent.slug}
                                location={similarEvent.location}
                                date={similarEvent.date}
                                time={similarEvent.time}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default EventDetail;
