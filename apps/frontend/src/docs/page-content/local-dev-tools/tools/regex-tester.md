---
title: "Regex Tester"
date: "2020-01-01"
order: 12
---

Test regular expressions with live highlighting, match groups, and performance timing. See exactly what your regex matches and why.

## Features

- **Live highlighting** - See matches highlighted in real-time
- **Match details** - View full match text, index position, and groups
- **Named groups** - Support for named capture groups
- **All regex flags** - g, i, m, s, u, y flags with checkboxes
- **Execution timing** - See how long your regex takes to execute
- **Copy all matches** - Export all matches at once

## How to Use

1. Enter your regex pattern in the pattern input
2. Select the flags you need (global, case-insensitive, etc.)
3. Enter your test string
4. View matches highlighted in the preview
5. Inspect match details in the cards below

## Regex Flags

| Flag | Name        | Description                          |
| ---- | ----------- | ------------------------------------ |
| g    | Global      | Find all matches, not just the first |
| i    | Ignore Case | Case-insensitive matching            |
| m    | Multiline   | `^` and `$` match line boundaries    |
| s    | DotAll      | `.` matches newlines                 |
| u    | Unicode     | Enable Unicode support               |
| y    | Sticky      | Match only from lastIndex position   |

## Match Information

Each match card shows:

- **Full match** - The complete matched text
- **Index** - Position in the string where the match starts
- **Groups** - Numbered capture groups (1, 2, 3...)
- **Named groups** - Named capture groups if defined

## Validation

A green banner indicates a valid regex pattern. A red banner shows syntax errors in your pattern.
