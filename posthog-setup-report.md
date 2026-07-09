<wizard-report>
# PostHog post-wizard report

The wizard has completed a focused PostHog integration for this Next.js App Router project. It added client-side PostHog initialization in `instrumentation-client.ts`, configured a reverse-proxy-style ingest rewrite in `next.config.ts`, installed the PostHog SDK packages, and instrumented three homepage interaction events in the existing UI components. It also created a starter dashboard plus five related insights in PostHog for monitoring homepage engagement and event discovery behavior.

| Event name | Description | File |
| --- | --- | --- |
| `explore_events_clicked` | Tracks when a visitor clicks the homepage explore events call to action. | `components/ExploreBtn.tsx` |
| `featured_event_selected` | Tracks when a visitor selects a featured event card from the homepage list. | `components/EventCard.tsx` |
| `create_event_nav_clicked` | Tracks when a visitor clicks the create event navigation link. | `components/NavBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- Dashboard: https://eu.posthog.com/project/219774/dashboard/805651
- Insight: Explore CTA clicks (wizard) — https://eu.posthog.com/project/219774/insights/MkGtNGtp
- Insight: Featured events selected by slug (wizard) — https://eu.posthog.com/project/219774/insights/uflKsqyu
- Insight: Create event nav clicks (wizard) — https://eu.posthog.com/project/219774/insights/QtnmQzJ0
- Insight: Homepage engagement funnel (wizard) — https://eu.posthog.com/project/219774/insights/ZHcm9UNC
- Insight: Featured event selection share (wizard) — https://eu.posthog.com/project/219774/insights/djPpeL45

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names you added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
