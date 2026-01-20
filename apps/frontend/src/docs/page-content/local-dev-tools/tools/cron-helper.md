---
title: "Cron Helper"
date: "2020-01-01"
order: 16
---

Parse cron expressions and see human-readable descriptions, next run times, and field breakdowns. Supports both 5-field (standard) and 6-field (with seconds) formats.

## Features

- **Human-readable descriptions** - Understand what a cron expression means
- **Next 10 runs** - See exactly when the job will execute
- **Field breakdown** - View parsed values for each field
- **Common presets** - Quick buttons for frequent schedules
- **Seconds support** - Optional 6-field format with seconds

## How to Use

1. Enter a cron expression or click a preset
2. Enable "Include seconds" for 6-field format
3. Click "Parse"
4. View the description and next run times

## Common Presets

| Preset         | Expression    | Description                     |
| -------------- | ------------- | ------------------------------- |
| Every minute   | `* * * * *`   | Runs every minute               |
| Every 5 min    | `*/5 * * * *` | Runs every 5 minutes            |
| Hourly         | `0 * * * *`   | Runs at the start of every hour |
| Daily midnight | `0 0 * * *`   | Runs at midnight                |
| Weekly         | `0 0 * * 0`   | Runs Sunday at midnight         |
| Monthly        | `0 0 1 * *`   | Runs first of month at midnight |

## Cron Field Reference

### 5-Field Format (Standard)

```
* * * * *
| | | | |
| | | | +-- Day of week (0-7, Sun=0 or 7)
| | | +---- Month (1-12)
| | +------ Day of month (1-31)
| +-------- Hour (0-23)
+---------- Minute (0-59)
```

### 6-Field Format (With Seconds)

```
* * * * * *
| | | | | |
| | | | | +-- Day of week (0-7)
| | | | +---- Month (1-12)
| | | +------ Day of month (1-31)
| | +-------- Hour (0-23)
| +---------- Minute (0-59)
+------------ Second (0-59)
```
