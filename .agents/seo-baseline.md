# UseMiller SEO baseline

Last updated: 2026-09-05

This file is the durable starting point for SEO work on `usemiller.dev`. Refresh the
reporting windows before using the figures for a later decision; do not treat them as live
data.

## Outcomes to measure

The commercial outcomes, in priority order, are:

1. A Local Dev Tools installer download.
2. A Dev Shell checkout start.
3. A Miller Start "Create with your agent" click.
4. A Miller Start consulting checkout start.

GA4 event names:

| Outcome | Event |
| --- | --- |
| Local Dev Tools installer download | `local_dev_tools_download` |
| Local Dev Tools checkout start | `local_dev_tools_begin_checkout` |
| Dev Shell checkout start | `dev_shell_begin_checkout` |
| Miller Start agent handoff | `miller_start_agent_click` |
| Miller Start consulting checkout start | `miller_consulting_begin_checkout` |

The four priority outcome events were configured as GA4 key events on 2026-09-05. The GA4
property also has the built-in `purchase` key event. Checkout-start events measure intent,
not completed revenue; send provider-confirmed purchase events later through Stripe and
Gumroad rather than inferring purchases from button clicks.

## Search baseline

Google Search Console, 2026-08-08 through 2026-09-04 compared with the preceding 28 days:

| Metric | Current | Previous |
| --- | ---: | ---: |
| Clicks | 1 | 4 |
| Impressions | 371 | 427 |
| CTR | 0.27% | 0.94% |
| Average position | 24.0 | 21.25 |

Near-term page opportunities:

- `/dev-shell`: 107 impressions, 0 clicks, average position 12.64.
- `/local-dev-tools`: 83 impressions, 1 click, average position 26.59.
- `/`: 76 impressions, 0 clicks, average position 20.03.
- `/miller-start`: 20 impressions, 0 clicks, average position 18.8.
- `/docs/dev-shell/get-started/installation`: 19 impressions, average position 7.58.

Useful query themes include `dev shell`, `dev shell commands`, `developer utilities`,
`devshell`, and `free developer utility tools`. Query volume is still too low to justify
large content bets from these figures alone.

The sitemap at `https://usemiller.dev/sitemap.xml` has no reported errors or warnings. The
homepage inspection passed and reported "Submitted and indexed". `/auth/login` appeared in
search results and should be removed from the index with a `noindex` directive.

## Analytics baseline

GA4, 2026-08-08 through 2026-09-04:

- Organic Search: 7 sessions, 4 engaged sessions.
- Direct: 297 sessions, 21 engaged sessions.
- Referral: 13 sessions, 6 engaged sessions.
- No custom outcome events were present at baseline. The built-in `purchase` key event was
  configured but had no recorded activity in the reporting window.

Raw sessions are not a reliable primary KPI. The current period includes 216 direct sessions
from Singapore and a one-day spike of 160 sessions with only 12 engaged sessions, which is
consistent with automated or otherwise low-quality traffic. Use Search Console performance,
engaged organic sessions, and the outcome events above instead.

## First iteration backlog

1. Deploy and validate the outcome events in GA4 Realtime or DebugView.
2. Confirm that `/auth/login` and `/auth/logout` leave the Google index after recrawling.
3. Compare `/dev-shell` CTR over a full 28-day window after the title, description, and H1
   were aligned to "dev shell" intent on 2026-09-05.
4. Align the remaining homepage and product pages around distinct query intent; avoid making several
   pages compete for the same broad "developer tools" theme.
5. Decide whether consulting should be sold directly on `usemiller.dev`, referred to
   `darraghoriordan.com/hire-me`, or presented as one offer with a single canonical landing
   page before expanding consulting content.
6. Reconcile the privacy page: it currently describes Plausible while production code loads
   Google Analytics. Treat this as a legal/privacy review, not merely an SEO copy edit.

Review on a 28-day cadence until volume is materially higher. Compare complete periods and
record the hypothesis and change date for every title, content, or internal-link experiment.
