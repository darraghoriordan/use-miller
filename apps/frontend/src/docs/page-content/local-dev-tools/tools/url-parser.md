---
title: "URL Parser"
date: "2020-01-01"
order: 13
---

Parse URLs and extract all components into separate, copyable fields. Perfect for debugging URLs or extracting specific parts.

## Features

- **Full URL breakdown** - Protocol, host, port, path, hash
- **Path parts** - Each path segment as a separate item
- **Query parameters** - Parsed into a key-value table
- **Decode option** - Automatically decode URL-encoded parameters
- **One-click copy** - Copy any component instantly

## How to Use

1. Paste your URL in the input field
2. Check "Decode query parameters" if needed
3. Click "Parse URL"
4. Copy the components you need

## Parsed Components

| Component | Example           |
| --------- | ----------------- |
| Protocol  | `https:`          |
| Host      | `api.example.com` |
| Port      | `8080`            |
| Path      | `/v1/users/123`   |
| Hash      | `#section`        |

### Path Parts

The path is split into individual segments:

- `/v1/users/123` becomes: `v1`, `users`, `123`

### Query Parameters

Query strings are parsed into a table:

- `?name=John&age=30` becomes a table with name/value pairs

## FAQs

### Why are my query parameters still encoded?

Enable "Decode query parameters" to see the decoded values. This converts `%20` to spaces, `%26` to `&`, etc.

### What if my URL has multiple values for the same parameter?

Parameters with the same key (like `?tag=a&tag=b`) are shown as separate rows in the table.
