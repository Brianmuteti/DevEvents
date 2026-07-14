import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { events } from "@/lib/constants";
import { cacheLife } from "next/cache";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
    "use cache";
    cacheLife("hours"); // Cache for 60 seconds
    const res = await fetch(`${BASE_URL}/api/events`);
    const { events } = await res.json();
    return (
        <section>
            <h1 className="text-center">The dev hub you cant miss</h1>
            <p className="text-center mt-5">
                {" "}
                Hackathons, meetups, and conferences, All in one place!
            </p>
            <ExploreBtn />
            <div className="mt-20 space-x-7">
                <h3>Featured Events</h3>
                <ul className="events list-none">
                    {events &&
                        events.length > 0 &&
                        events.map((event: IEvent) => (
                            <li key={event.slug}>
                                <EventCard
                                    title={event.title}
                                    image={event.image}
                                    slug={event.slug}
                                    location={event.location}
                                    date={event.date}
                                    time={event.time}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
};

export default Home;
