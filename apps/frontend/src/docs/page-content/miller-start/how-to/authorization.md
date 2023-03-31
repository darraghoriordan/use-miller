---
title: "Authorization"
date: "2020-01-01"
order: 50
---

Miller Start uses Auth0 for authentication and for most authorization.

Miller start is multi tenant so there are many checks in the code to ensure that users can only access data for their own organization.

## Normal users

"normal" users get no special scopes.

## Special roles

There is one special role - `super_admin`. This role is used to grant access to the admin panel and special apis.

The super admin is likely you. You should grant your self access either via the production auth0 terraform module or via the auth0 dashboard.

The special role applies "modify:all and read:all" permissions to the auth0 tokens.

## /super-admin routes

There are undocumented routes in the frontend app for viewing some reports.

These routes are only accessible to users with the `super_admin` role.

`/super-admin/users` - a list of all your users
`/super-admin/org-subs` - a list of subscriptions for all your organizations
`/super-admin/payment-events` - the last 10 payment events in the system

The apis for these routes are also only accessible to users with the `super_admin` role so the data is secured.

You can add any reports you like using the same permissions model.
