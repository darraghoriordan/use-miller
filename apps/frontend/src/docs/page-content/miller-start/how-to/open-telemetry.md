---
title: "Open Telemetry"
date: "2020-01-01"
order: 50
---

Miller start is configured to use Open Telemetry for tracing with propagation in frontend and backend.

In local development Jaeger and Prometheus are started for you when you run `pnpm up` in the backend. Traces and metrics will be sent to Jaeger and Prometheus respectively.

In production you should consider a third party telemetry provider. You can configure the endpoint using the environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` in both NestJs and NextJs.

You can turn otel off in the frontend and backend independently. These settings use the relevant framework's settings.

## View Open Telemetry data locally

You can view the traces in Jaeger at http://localhost:16686/.

You can view the metrics in Prometheus at http://localhost:9090/.

## View Open Telemetry data in production

Refer to your telemetry provider's documentation.

You do not have to configure instrumentation using a third party provider's libraries. You can use the default Open Telemetry exporters that are included in Miller Start with all the major Telemetry SaaS tools.

## Control Open Telemetry in frontend NextJs

Set `instrumentationHook` to true or false as required.

```js
const nextConfig = {
    experimental: {
        instrumentationHook: false, // true to enable otel,
    },
};
```

## Control Open Telemetry in backend NestJs

Set `OTEL_SDK_DISABLED` env var to true or false as required.

```shell
OTEL_SDK_DISABLED=true # false to enable otel
```

You can configure the endpoint using the environment variable `NEXT_PUBLIC_OTEL_ENDPOINT`. The default is `http://localhost:4317`. You can set this to a relevant telemetry provider.
