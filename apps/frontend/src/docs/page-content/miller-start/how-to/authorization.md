---
title: "Authorization"
date: "2020-01-01"
order: 50
---

Miller Start uses Better Auth for identity and sessions. Application authorization remains
in the NestJS backend and shared library.

Miller start is multi tenant so there are many checks in the code to ensure that users can only access data for their own organization.

## Normal users

"normal" users get no special scopes.

## Operators

Better Auth's `admin` role grants access to identity administration. The backend maps that
role to Miller's global application permissions, which protect the starter's operational
APIs. Hiding a link in the frontend is never the security boundary.

Bootstrap the first owner by adding their email to `SUPER_USER_EMAILS` in the ignored local
`apps/backend/.env`, or `app_super_user_emails` in the production Dokku variables. Matching
identities are promoted on creation and at backend startup, so setup is safe to rerun. Use
the admin UI for subsequent operators instead of growing the bootstrap list indefinitely.

## /super-admin routes

The dashboard shows an Operations section only to admins. All pages also enforce the role
during server rendering:

- `/super-admin` — operational overview
- `/super-admin/identities` — Better Auth users, roles, suspensions, and sessions
- `/super-admin/users` — application user records
- `/super-admin/org-subs` — organization subscriptions
- `/super-admin/payment-events` — recent Stripe events

Better Auth owns its admin APIs under `/api/auth/admin/*`. Miller's application reports use
Nest guards and global permissions. Both are enforced by the backend.

You can add any reports you like using the same permissions model.
