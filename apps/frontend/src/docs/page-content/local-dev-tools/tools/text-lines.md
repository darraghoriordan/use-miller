---
title: "Text Lines Tool"
date: "2020-01-01"
order: 11
---

Process lines of text with sorting, deduplication, and line manipulation. Uses the Intl.Collator API for proper locale-aware sorting.

## Features

- **Sort lines** - Alphabetically sort lines (ascending or descending)
- **Deduplicate lines** - Remove duplicate lines
- **Prepend text** - Add text to the beginning of each line
- **Append text** - Add text to the end of each line
- **Locale-aware sorting** - Proper sorting for different languages

## How to Use

1. Paste your text in the input field
2. Enable the options you need:
    - Check "Sort lines" and choose direction
    - Check "Deduplicate lines" to remove duplicates
    - Enter text to prepend/append to each line
3. Select your locale for proper sorting
4. Click "Process"

## Locale-Aware Sorting

Different languages have different sorting rules. For example, in Swedish, "a" comes before "b" but "a" comes after "z". Select the appropriate locale to ensure correct sorting for your language.

## FAQs

### Why use this instead of command-line sort?

This tool provides a visual interface with multiple operations combined. It also handles locale-aware sorting correctly, which can be tricky to configure in command-line tools.

### Can I combine multiple operations?

Yes! You can sort, deduplicate, and add prefixes/suffixes all in one operation.
