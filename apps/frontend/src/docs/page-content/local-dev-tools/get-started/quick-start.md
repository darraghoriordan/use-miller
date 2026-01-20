---
title: "Quick Start"
date: "2020-01-01"
order: 1
---

## Windows Quickstart

1. Run the installer and follow the instructions. It's a standard installer, so you shouldn't have any problems.
2. Start the application if it doesn't start automatically after the installation is complete.
3. Configure the settings for ssh and git. You can find the settings in the settings menu.

You may get warnings from windows about the application being unsigned. This is because the application is not signed by a trusted certificate (This is expensive and annoying to do).

You can safely ignore these warnings this time.

## Mac Quickstart

1. Drag the application to the Applications folder.
2. Start the application.
3. Configure the settings for ssh and git. You can find the settings in the settings menu.

The Mac application is signed by a trusted certificate, but Apple will warn you that the application is not from the Mac App Store.

You can safely ignore this warning this time.

## Using the Application

Select the tool you want to use from the left hand menu and follow the instructions.

## Available Tools

Local Dev Tools includes 19 tools organized into 7 categories:

### Git & Dev

| Tool                                               | Description                                                                                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Git Project Configurations](../tools/gitprojects) | Scan and manage git configs across all repositories. Identify misconfigured repos where the commit user doesn't match other repos for the same git host. |
| [Git URL Converter](../tools/giturls)              | Convert git URLs between HTTP and SSH formats with SSH alias awareness. Perfect for developers who use custom SSH configurations.                        |

### JSON & Data

| Tool                                            | Description                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [JWT Decoder](../tools/jwt_decode)              | Decode JSON Web Tokens and inspect header/payload. Optionally verify signatures using HMAC algorithms (HS256, HS384, HS512). |
| [JSON Escape](../tools/jsonescape)              | Escape or unescape JSON strings. Handle double-encoded JSON from bash output or API responses.                               |
| [JSON Formatter](../tools/json-formatter)       | Format, minify, and validate JSON. Features include comment removal, key sorting, and search highlighting.                   |
| [JSON Form Encoder](../tools/json-form-encoder) | Convert between JSON and URL form-encoded format (application/x-www-form-urlencoded) with bracket notation support.          |

### Encoding

| Tool                                     | Description                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Base64 Encode/Decode](../tools/base64)  | Encode text to Base64 or decode Base64 strings back to plain text.                                                       |
| [HTML Char Encoding](../tools/htmlchars) | Encode or decode HTML entities and Unicode escape sequences for use in HTML or JavaScript.                               |
| [URI Encoder](../tools/uriencode)        | Encode or decode URLs and URI components. Properly handles the difference between full URIs and query string components. |

### Text & Strings

| Tool                                         | Description                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [String Case Converter](../tools/stringcase) | Convert text between 11 case formats: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. |
| [Text Lines Tool](../tools/text-lines)       | Sort, deduplicate, and manipulate text lines with locale-aware sorting and prepend/append operations.         |
| [Regex Tester](../tools/regex-tester)        | Test regular expressions with live highlighting, match groups, named captures, and execution timing.          |

### URL & Network

| Tool                                      | Description                                                                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [URL Parser](../tools/url-parser)         | Parse URLs and extract all components (protocol, host, port, path, query parameters, hash) into copyable fields.            |
| [Curl Generator](../tools/curl-generator) | Generate properly escaped curl commands from HTTP request parameters with support for all methods, headers, and body types. |

### Time & Date

| Tool                                            | Description                                                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Timestamp Converter](../tools/timestamps)      | Convert between Unix timestamps and human-readable dates. See UTC, local time, and relative time differences. |
| [Cron Helper](../tools/cron-helper)             | Parse cron expressions and see human-readable descriptions, next 10 run times, and field breakdowns.          |
| [Timezone Comparer](../tools/timezone-comparer) | Compare times across up to 8 timezones simultaneously. Perfect for scheduling meetings across global teams.   |

### Other

| Tool                                      | Description                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [Color Tools](../tools/colors)            | Convert colors between Hex, RGB, HSL, CMYK, HWB, and CSS names. Find the nearest TailwindCSS color match.                                  |
| [Marketing Week](../tools/marketing-week) | AI-powered content generation from git commits for Twitter, LinkedIn, and blog posts. Supports OpenAI, Gemini, and local LM Studio models. |

## Online Tools

Some tools require online connectivity:

- **Marketing Week** uses AI APIs (OpenAI, Gemini) for content generation. You can also use local models via LM Studio for fully offline operation.

Online features are clearly marked in the UI. All other tools work completely offline.

## Adding Your License

Click on the "View License" button on the bottom left of the application. This will open the license page. Enter the license key and click "Activate".
