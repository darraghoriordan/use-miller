# NextJs frontend

This is the NextJs frontend for Miller Start.

It uses SSR and SSG to render pages. There are some dynamic components for the code viewer.

## Web Analytics

The production frontend loads Cloudflare Web Analytics when
`CF_WEB_ANALYTICS_TOKEN` is set. Get the site token from Cloudflare's
Web Analytics **Manage site** page. Set it in the Dokku Terraform variable
`frontend_app_cloudflare_web_analytics_token`, or in the frontend process
environment for other deployments. The token is public; the runtime config
serves it to the browser. When Cloudflare has already injected the beacon, the
frontend does not add another copy.

Cloudflare records page views and performance, including client-side route
changes. It currently does not support the former Google Analytics custom
events for downloads, checkout starts, or CTA clicks. The Crisp support chat,
Gumroad overlay, and YouTube embed are separate third-party integrations and
need their own privacy review.
