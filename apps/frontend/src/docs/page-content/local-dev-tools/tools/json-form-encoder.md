---
title: "JSON Form Encoder"
date: "2020-01-01"
order: 6
---

Convert between JSON and URL form-encoded format (application/x-www-form-urlencoded). Supports nested objects with PHP/jQuery bracket notation.

## Features

- **JSON to Form-Encoded** - Convert JSON objects to query string format
- **Form-Encoded to JSON** - Parse query strings back to JSON objects
- **Space encoding options** - Use `+` or `%20` for spaces
- **Key sorting** - Alphabetically sort parameters

## How to Use

1. Paste your JSON or form-encoded string
2. Select the conversion direction
3. Configure encoding options
4. Click "Convert"

## Options

- **Use + for spaces** - Encode spaces as `+` instead of `%20` (common in form submissions)
- **Sort keys alphabetically** - Output parameters in alphabetical order

## What is Form-Encoded?

The `application/x-www-form-urlencoded` format is used by HTML forms and many APIs. It represents data as key-value pairs separated by `&`, with special characters percent-encoded.

Example:

- JSON: `{"name": "John Doe", "age": 30}`
- Form-encoded: `name=John+Doe&age=30`

## Nested Object Handling

Nested objects use bracket notation:

- JSON: `{"user": {"name": "John"}}`
- Form-encoded: `user[name]=John`
