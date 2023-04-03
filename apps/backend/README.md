# NestJS Backend

This is the NestJs backend. It contains modules for course files, some custom onboarding and the handling of digital subscription assets.

Most of the code for SaaS backend functionality is in the `nest-backend-libs` repository. You should go to that project to see the code for users, organisations, payments, etc.

Keeping the SaaS features in a library means the web application is very focused on the business logic of the specific application. It also means we can reuse the SaaS features in other projects.
