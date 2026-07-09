import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
        api_host: "/ingest",
        ui_host: posthogHost,
        defaults: "2026-05-30",
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
    });
}
