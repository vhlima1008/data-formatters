# data-formatters

[![CI](https://github.com/vhlima1008/data-formatters/actions/workflows/ci.yml/badge.svg)](https://github.com/vhlima1008/data-formatters/actions)
[![npm version](https://img.shields.io/npm/v/data-formatters.svg)](https://www.npmjs.com/package/data-formatters)
[![npm downloads](https://img.shields.io/npm/dm/data-formatters.svg)](https://www.npmjs.com/package/data-formatters)
[![License](https://img.shields.io/github/license/vhlima1008/data-formatters)](LICENSE)

Utility library for **formatting numbers, currency, percentages, and text** using modern `Intl` APIs.
This project provides small, reusable helpers to standardize value formatting in frontend applications.

---

# Features
- Currency formatting
- Compact currency formatting
- Number formatting
- Compact numbers
- Percent formatting
- Compact percent formatting
- Name normalization (Title Case)
- Locale support (`Intl`)
- Lightweight and dependency-free

---

# Installation
```bash
npm install data-formatters
````
or
```bash
yarn add data-formatters
```

---
# Usage
```ts
import {
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercent,
  formatCompactPercent,
  formatName
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
# 🌍 Locale Support
The library uses the native **Intl API**, so formatting behavior depends on the provided locale.
Examples:
| Locale  | Number Example |
| ------- | -------------- |
| `en-US` | 1,000          |
| `pt-BR` | 1.000          |
| `de-DE` | 1.000          |

---
# 🧪 Testing
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
# 🏗 Development
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
# 🤝 Contributing
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
# 📜 License
Distributed under the **MIT License**.
See `LICENSE` for more information.

---
# 👤 Author
Victor Hugo Lima Monteiro
GitHub: [https://github.com/vhlima1008](https://github.com/vhlima1008)
