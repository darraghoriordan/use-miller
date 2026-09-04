# UseMiller product marketing context

## Sites

- Canonical product site: `https://usemiller.dev`
- Related personal/consulting site: `https://www.darraghoriordan.com`
- Broader consulting page: `https://www.darraghoriordan.com/hire`

Miller-specific implementation or consulting offers should be evaluated alongside the
broader consulting funnel on darraghoriordan.com. Keep the sites' positioning distinct and
link them where the visitor's intent calls for it.

## Primary conversion signals

1. Local Dev Tools download.
2. Dev Shell purchase.
3. Miller Start "build with agent" interaction.
4. Miller Start consulting-package purchase.

Treat activation events such as clicks, prompt copies, and downloads separately from
authoritative purchase events.

## Google measurement infrastructure

Google Cloud project metadata (not secret):

- Project name: `UseMiller`
- Project number: `676060617024`
- Project ID: `usemiller`
- SEO reader service account: `miller-seo-reader@usemiller.iam.gserviceaccount.com`

Current known state:

- A Search Console property is configured for `usemiller.dev`.
- Search Console is associated with a Google Analytics property.
- The production site loads GA4 measurement ID `G-V43743ZN7K`.
- The numeric GA4 property ID is `533925353`.
- A service account has been granted Search Console access and Google Analytics
  `Marketer` access for measurement setup. Consider reducing Analytics access to `Viewer`
  after event and key-event configuration is complete.
- Search Console API access is verified for `sc-domain:usemiller.dev` with
  `siteRestrictedUser` permission.
- Local Application Default Credentials use keyless service-account impersonation. The
  Google Analytics Data API, Google Analytics Admin API, Search Console API, and Service
  Account Credentials API are enabled in the `usemiller` Google Cloud project.

Never commit OAuth credentials, Application Default Credentials, service-account keys,
access tokens, refresh tokens, or analytics exports containing sensitive data. Store only
non-secret identifiers and redacted/aggregated reports in the repository.

The current measurement baseline, event taxonomy, and iteration backlog are recorded in
`.agents/seo-baseline.md`.
