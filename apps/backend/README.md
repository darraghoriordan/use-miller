# NestJS Backend

This is the NestJs backend. It contains modules for course files, some custom onboarding and the handling of digital subscription assets.

Most of the code for SaaS backend functionality is in the `nest-backend-libs` repository. You should go to that project to see the code for users, organisations, payments, etc.

Keeping the SaaS features in a library means the web application is very focused on the business logic of the specific application. It also means we can reuse the SaaS features in other projects.

Stripe is provided by `@darraghor/nest-backend-libs` v7 through its opinionated
`StripePaymentsModule`. The app supplies only the server-side product catalog and
credentials; the shared module owns checkout idempotency, webhook verification and
replay, and payment-state ordering. Run Miller's local
`StrengthenStripePayments1775000000000` migration before deploying the module.

Better Auth is hosted inside NestJS, including the Admin plugin under
`/api/auth/admin/*`. The application maps Better Auth's `admin` role into the existing
global Nest authorization permissions, so privileged APIs remain protected at the backend
boundary. `SUPER_USER_EMAILS` is an idempotent owner bootstrap: matching identities are
promoted at creation and again during startup. Use the Admin API for later role, suspension,
session, and identity operations instead of editing the database.

Google is the only sign-in provider. On first login, the shared authorization module links a
verified Google identity to the single existing application user with the same email, so the
user's memberships and product data are preserved.

`pnpm run db:run` builds the backend before applying compiled TypeORM migrations.
`pnpm run mill:dev` starts the local containers and runs this command before either app.
