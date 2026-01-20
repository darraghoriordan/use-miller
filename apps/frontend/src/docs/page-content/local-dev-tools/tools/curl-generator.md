---
title: "Curl Generator"
date: "2020-01-01"
order: 14
---

Generate properly escaped curl commands from HTTP request parameters. Build complex requests visually and export them for use in terminal or scripts.

## Features

- **All HTTP methods** - GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- **Multiple body types** - None, JSON, Form Data, File Upload
- **Custom headers** - Add any number of request headers
- **Common options** - Insecure mode, follow redirects, compression, verbose
- **Bash escaping** - Output is properly escaped for shell use
- **Multiline output** - Format as single line or readable multiline

## How to Use

1. Enter the request URL
2. Select the HTTP method
3. Choose body type and enter content (if applicable)
4. Add headers as needed
5. Enable any curl options
6. Click "Generate"
7. Copy the generated command

## Curl Options

| Option           | Flag           | Description                         |
| ---------------- | -------------- | ----------------------------------- |
| Insecure         | `-k`           | Skip SSL certificate verification   |
| Follow Redirects | `-L`           | Follow HTTP redirects               |
| Compressed       | `--compressed` | Request compressed response         |
| Verbose          | `-v`           | Show detailed request/response info |

## Body Types

- **None** - No request body (typical for GET)
- **JSON** - Sets `Content-Type: application/json` and sends JSON body
- **Form Data** - Sets `Content-Type: application/x-www-form-urlencoded`
- **File Upload** - Uses `@filepath` syntax for file uploads

## Multiline Output

Enable "Multiline" for readable output with line continuations (`\`), making it easier to review complex requests.
