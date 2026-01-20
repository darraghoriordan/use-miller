---
title: "JWT Decoder"
date: "2020-01-01"
order: 3
---

Decode JSON Web Tokens (JWT) and inspect their header and payload. Optionally verify the signature using HMAC algorithms.

![JWT Decoder](images/jwt_decoder.png)

## Features

- **Instant decoding** - View JWT header and payload as formatted JSON
- **Signature verification** - Verify tokens signed with HS256, HS384, or HS512
- **Offline processing** - All decoding happens locally, your tokens never leave your machine

## How to Use

1. Paste your JWT token in the input field
2. Click "Decode" to see the header and payload
3. (Optional) Expand "Verify Signature" and enter your secret to validate the token

## Signature Verification

The tool supports HMAC-based signature verification:

- **HS256** - HMAC using SHA-256
- **HS384** - HMAC using SHA-384
- **HS512** - HMAC using SHA-512

A green banner indicates a valid signature. A red banner indicates the signature is invalid or the algorithm is not supported.

## What is a JWT?

A JSON Web Token (JWT) is a compact, URL-safe way to represent claims between two parties. It consists of three parts separated by dots: header, payload, and signature. JWTs are commonly used for authentication and authorization in web applications.
