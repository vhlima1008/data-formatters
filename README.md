# data-formatters

[![CI](https://github.com/vhlima1008/data-formatters/actions/workflows/ci.yml/badge.svg)](https://github.com/vhlima1008/data-formatters/actions)
[![npm version](https://img.shields.io/npm/v/data-formatters.svg)](https://www.npmjs.com/package/data-formatters)
[![npm downloads](https://img.shields.io/npm/dm/data-formatters.svg)](https://www.npmjs.com/package/data-formatters)
[![License](https://img.shields.io/github/license/vhlima1008/data-formatters)](LICENSE)

Utility library for **formatting numbers, currency, percentages, dates, time, bytes, and text** using modern `Intl` APIs.
This project provides small, reusable helpers to standardize value formatting in frontend applications.

---

# Features
- Currency formatting
- Compact currency formatting
- Number formatting
- Compact numbers
- Percent formatting
- Compact percent formatting
- Date formatting
- Date/time formatting
- Relative time formatting
- Duration formatting
- Bytes formatting
- Name normalization (Title Case)
- Locale support (`Intl`)
- Lightweight and dependency-free

---

# Installation
```bash
npm install data-formatters
```
or
```bash
yarn add data-formatters
```

---
# Usage
```ts
import {
  formatBytes,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatCompactCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercent,
  formatCompactPercent,
  formatName,
  formatRelativeTime
} from "data-formatters"
```

### Currency
```ts
formatCurrency(1200, {
  currency: "USD",
  locale: "en-US"
})
```
Result:
```
$1,200.00
```

### Compact Currency
```ts
formatCompactCurrency(1200000, {
  currency: "USD",
  locale: "en-US"
})
```
Result:

```
$1.2M
```

---
### Numbers
```ts
formatNumber(1200, { locale: "en-US" })
```
Result:

```
1,200
```

---
### Compact Numbers
```ts
formatCompactNumber(1500, { locale: "en-US" })
```
Result:
```
1.5K
```

---
### Percent
```ts
formatPercent(0.25, { locale: "en-US" })
```
Result:
```
25%
```

---
### Compact Percent
```ts
formatCompactPercent(0.1234, { locale: "en-US" })
```
Result:
```
12.3%
```

---
### Name Formatting
```ts
formatName("victor hugo lima")
```
Result:
```
Victor Hugo Lima
```

---
### Bytes
```ts
formatBytes(1536)
```
Result:
```
1.5 KB
```

---
### Date
```ts
formatDate("2026-03-09T00:00:00Z", {
  locale: "en-US",
  timeZone: "UTC"
})
```
Result:
```
03/09/2026
```

---
### DateTime
```ts
formatDateTime("2026-03-09T14:30:00Z", {
  locale: "en-US",
  timeZone: "UTC",
  dateStyle: "medium",
  timeStyle: "short"
})
```
Result:
```
Mar 9, 2026, 2:30 PM
```

---
### Duration
```ts
formatDuration(3665)
```
Result:
```
1h 1m 5s
```

---
### Relative Time
```ts
formatRelativeTime(-1, "day", "en-US")
```
Result:
```
yesterday
```

---
# Locale Support
The library uses the native **Intl API**, so formatting behavior depends on the provided locale.
Examples:
| Locale  | Number Example |
| ------- | -------------- |
| `en-US` | 1,000          |
| `pt-BR` | 1.000          |
| `de-DE` | 1.000          |

---
# Testing
Tests are written using **Vitest**.
Run locally:
```bash
npm test
```
Run in watch mode:
```bash
npm run test:watch
```

---
# Development
Clone the repository:
```bash
git clone https://github.com/vhlima1008/data-formatters.git
```
Install dependencies:
```bash
npm install
```
Build:
```bash
npm run build
```

---
# Contributing
Contributions are welcome!
Steps:
1. Fork the repository
2. Create a branch
```
git checkout -b feature/my-feature
```
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---
# License
Distributed under the **MIT License**.
See `LICENSE` for more information.

---
# Author
Victor Hugo Lima Monteiro
GitHub: [https://github.com/vhlima1008](https://github.com/vhlima1008)
