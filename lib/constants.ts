export interface EventItem {
    title: string;
    image: string;
    slug: string;
    location: string;
    Date: string;
    Time: string;
}

export const events: EventItem[] = [
    {
        title: "React Summit 2026",
        image: "/images/event1.png",
        slug: "react-summit-2026",
        location: "Amsterdam, Netherlands",
        Date: "June 12, 2026",
        Time: "09:00 AM – 06:00 PM",
    },
    {
        title: "GitHub Universe Local Hackathon",
        image: "/images/event2.png",
        slug: "github-universe-hackathon",
        location: "San Francisco, CA",
        Date: "July 24, 2026",
        Time: "10:00 AM – 08:00 PM",
    },
    {
        title: "Microsoft Build Workshop",
        image: "/images/event3.png",
        slug: "microsoft-build-workshop",
        location: "Seattle, WA",
        Date: "August 4, 2026",
        Time: "09:30 AM – 05:30 PM",
    },
    {
        title: "Next.js Conf + Hack Day",
        image: "/images/event4.png",
        slug: "nextjs-conf-hack-day",
        location: "Portland, OR",
        Date: "September 9, 2026",
        Time: "11:00 AM – 07:00 PM",
    },
    {
        title: "Firebase Developer Meetup",
        image: "/images/event5.png",
        slug: "firebase-developer-meetup",
        location: "Austin, TX",
        Date: "October 18, 2026",
        Time: "06:00 PM – 09:00 PM",
    },
    {
        title: "AI & Cloud Summit",
        image: "/images/event6.png",
        slug: "ai-cloud-summit",
        location: "London, UK",
        Date: "November 5, 2026",
        Time: "08:30 AM – 05:00 PM",
    },
];
