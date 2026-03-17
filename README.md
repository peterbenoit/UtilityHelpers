# UtilityHelpers

A comprehensive collection of JavaScript utility functions for image processing, array manipulation, string operations, object utilities, date helpers, validation, DOM utilities, and more.

**Author:** Peter Benoit
**License:** MIT
**GitHub:** [peterbenoit/UtilityHelpers](https://github.com/peterbenoit/UtilityHelpers)

---

## CDN Usage

### jsDelivr (recommended)

```html
<!-- Pinned to a specific version -->
<script src="https://cdn.jsdelivr.net/npm/@peterbenoit/utility-helpers@1.0.0/utilityHelpers.js"></script>

<!-- Always latest -->
<script src="https://cdn.jsdelivr.net/npm/@peterbenoit/utility-helpers/utilityHelpers.js"></script>
```

### unpkg

```html
<!-- Pinned to a specific version -->
<script src="https://unpkg.com/@peterbenoit/utility-helpers@1.0.0/utilityHelpers.js"></script>

<!-- Always latest -->
<script src="https://unpkg.com/@peterbenoit/utility-helpers/utilityHelpers.js"></script>
```

After including the script, `UtilityHelpers` is available as a global class:

```js
const uuid = UtilityHelpers.generateUUID();
const chunks = UtilityHelpers.chunk([1, 2, 3, 4], 2);
const hex = UtilityHelpers.rgbToHex(255, 0, 0);
```

---

## npm / Node.js

```bash
npm install @peterbenoit/utility-helpers
```

```js
const UtilityHelpers = require('@peterbenoit/utility-helpers');

const uuid = UtilityHelpers.generateUUID();
```

---

## Documentation

Full API documentation with live examples is available at the project homepage.

---

## Methods

### Image Utilities
- `getImageDetails(imageSrc, calculateAverageColor?)` — width, height, size, format, orientation
- `getImageOrientation(image)` — `'landscape'` | `'portrait'` | `'square'`
- `getImageFormat(mimeType)` — human-readable format name from MIME type
- `getAverageImageColor(imageSrc)` — average rgb color of an image
- `getImageBase64(imageSrc, options?)` — base64-encoded data URL
- `getLuminance(color)` — relative luminance value
- `getContrastRatio(color1, color2)` — WCAG contrast ratio
- `formatBytes(bytes, decimals?)` — human-readable file size

### Array Utilities
- `chunk(array, size)` — split into chunks
- `shuffleArray(array)` — random shuffle (non-mutating)
- `flattenArray(arr)` — deep flatten
- `sumArray(arr)` — sum of values
- `countUniqueElements(arr)` — count of distinct values
- `findDuplicates(arr)` — array of duplicate values
- `countOccurrences(arr, val)` — count of a specific value
- `getRandomElement(arr)` — random element
- `getMedian(arr)` — median value
- `range(start, end, step?)` — numeric range array
- `groupBy(array, key)` — group by key or function

### String Utilities
- `capitalizeWords(str)` — title case
- `pluralize(word, count)` — smart pluralization
- `escapeHtml(str)` / `unescapeHtml(str)` — HTML entity handling
- `randomString(length)` — random alphanumeric string
- `numberToWords(num)` — number to English words (supports negatives)
- `escapeRegex(str)` — escape special regex characters
- `camelCase(str)` / `kebabCase(str)` / `snakeCase(str)` — case conversion
- `truncate(str, length?)` — truncate with ellipsis
- `stripHtml(str)` — remove HTML tags

### Object Utilities
- `pick(object, keys)` — select keys
- `omit(object, keys)` — exclude keys
- `isEqual(a, b)` — deep equality check
- `deepMerge(target, source)` — deep immutable merge
- `getType(value)` — `'array'` | `'object'` | typeof
- `isObjectEmpty(obj)` — empty object check

### Date & Time
- `randomDateBetweenTwo(start, end)` — random date in range
- `timeStampID()` — unique timestamp-based ID

### General Utilities
- `generateUUID()` — UUID v4
- `rgbToHex(r, g, b)` — RGB to hex
- `limitDecimalPlaces(num, places)` — precision control
- `generateRandomColor()` — random hex color
- `getQueryParams(url)` — parse URL query string
- `getURLParts(url)` — parse URL components
- `shortenURL(url)` / `expandURL(encoded)` — base64-url encode/decode
- `levenshteinDistance(str1, str2)` — edit distance
- `clamp(value, min, max)` — clamp number
- `parseJSON(str, fallback?)` — safe JSON parse
- `formatNumber(num, locale?)` — locale-formatted number
- `formatCurrency(amount, currency?, locale?)` — locale-formatted currency
- `getFileExtension(filename)` — file extension

### Performance & Optimization
- `debounce(fn, delay)` — delay execution until quiet
- `throttle(fn, limit)` — limit execution rate
- `memoize(fn)` — cache results
- `wait(ms)` / `sleep(ms)` — async delay
- `retry(fn, attempts?, delay?)` — retry with exponential backoff
- `once(fn)` — execute only once
- `pipe(...fns)` / `compose(...fns)` — function composition

### Validation & Sanitization
- `isValidEmail(email)` — email format check
- `isValidURL(url)` — URL format check
- `validateAndSanitizeInput(inputElement, type, options?)` — form input validation

### DOM & UI
- `copyToClipboard(text)` — clipboard write
- `smoothScrollTo(selector)` — smooth scroll
- `toggleClassAfterDelay(element, className, delay)` — delayed class toggle
- `detectUserIdleTime(callback, idleTime?)` — idle detection (returns cancel fn)
- `getFormData(formElement)` — form data as object
- `downloadFile(content, filename, mimeType?)` — trigger download
- `toggleFullscreen(element?)` — fullscreen toggle
- `lazyLoadImages(selector?)` — intersection observer lazy load
- `getCSSVariable(name, element?)` / `setCSSVariable(name, value, element?)` — CSS custom properties
- `saveScrollPosition()` / `restoreScrollPosition()` — scroll position persistence
- `textToSpeech(text, options?)` / `getVoices()` — speech synthesis
- `debouncedInput(inputElement, callback, delay?)` — debounced input handler
- `runInParallel(tasks)` — `Promise.all` wrapper

---

## Release Steps

```bash
# 1. Bump version
npm version patch   # or minor / major

# 2. Verify what will be published
npm run pack:dry

# 3. Publish to npm
npm publish --access public

# 4. Push tag to GitHub
git push && git push --tags
```

---

## License

This project is licensed under the MIT License.

---
Created by [Peter Benoit](https://peterbenoit.com)


