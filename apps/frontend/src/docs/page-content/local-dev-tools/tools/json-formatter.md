---
title: "JSON Formatter"
date: "2020-01-01"
order: 5
---

Format, minify, and validate JSON with advanced options like comment removal, key sorting, and search highlighting.

## Features

- **Format** - Pretty-print JSON with customizable indentation
- **Minify** - Compress JSON by removing whitespace
- **Validate** - Check if JSON is valid without modifying it
- **Remove comments** - Strip JavaScript-style comments from JSON
- **Sort keys** - Alphabetically sort object keys for consistent output
- **Search** - Find and highlight text within the JSON (with case-sensitive option)

## How to Use

1. Paste your JSON in the input field
2. Select an action: Format, Minify, or Validate
3. Choose indentation: 2 spaces, 4 spaces, or Tab
4. Enable optional features (remove comments, sort keys)
5. Click "Process"

## Search Feature

Use the search input to find specific values or keys in your JSON. Matches are highlighted in the output with a count displayed.

## Handling Comments

While standard JSON doesn't support comments, many configuration files use JSON with JavaScript-style comments (`//` and `/* */`). Enable "Remove comments" to strip these before processing.

## Validation

A green banner indicates valid JSON. A red banner shows the JSON is invalid with details about the parsing error.
