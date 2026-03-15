/**
 * Node.js sanity test for UtilityHelpers.
 * Verifies core non-DOM methods work correctly in a Node environment.
 * Full browser test suite: open tests.html in a browser.
 */

'use strict';

const UtilityHelpers = require('../utilityHelpers.js');

let passed = 0;
let failed = 0;

function assert(description, condition) {
	if (condition) {
		console.log(`  ✓ ${description}`);
		passed++;
	} else {
		console.error(`  ✗ FAIL: ${description}`);
		failed++;
	}
}

function assertEq(description, actual, expected) {
	const ok = JSON.stringify(actual) === JSON.stringify(expected);
	if (!ok) {
		console.error(`  ✗ FAIL: ${description}`);
		console.error(`      expected: ${JSON.stringify(expected)}`);
		console.error(`      received: ${JSON.stringify(actual)}`);
		failed++;
	} else {
		console.log(`  ✓ ${description}`);
		passed++;
	}
}

console.log('\nUtilityHelpers — Node Sanity Tests\n');

// ── Array ─────────────────────────────────────────────────────────────────────
console.log('Array Utilities');
assertEq('chunk([1,2,3,4], 2)', UtilityHelpers.chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
assertEq('flattenArray', UtilityHelpers.flattenArray([1, [2, [3]]]), [1, 2, 3]);
assertEq('sumArray', UtilityHelpers.sumArray([1, 2, 3]), 6);
assertEq('countUniqueElements', UtilityHelpers.countUniqueElements([1, 2, 2, 3]), 3);
assertEq('findDuplicates', UtilityHelpers.findDuplicates([1, 2, 2, 3, 3]), [2, 3]);
assertEq('countOccurrences', UtilityHelpers.countOccurrences([1, 2, 2, 3], 2), 2);
assertEq('getMedian odd', UtilityHelpers.getMedian([1, 3, 5]), 3);
assertEq('getMedian even', UtilityHelpers.getMedian([1, 2, 3, 4]), 2.5);
assertEq('range(1,5)', UtilityHelpers.range(1, 5), [1, 2, 3, 4, 5]);
assertEq('range(1,10,2)', UtilityHelpers.range(1, 10, 2), [1, 3, 5, 7, 9]);

const original = [1, 2, 3, 4, 5];
const shuffled = UtilityHelpers.shuffleArray(original);
assertEq('shuffleArray does not mutate', original, [1, 2, 3, 4, 5]);
assertEq('shuffleArray returns same elements', [...shuffled].sort((a, b) => a - b), [1, 2, 3, 4, 5]);

assert('getRandomElement is in source array', [10, 20, 30].includes(UtilityHelpers.getRandomElement([10, 20, 30])));

const grouped = UtilityHelpers.groupBy([1, 2, 3, 4], n => n % 2 === 0 ? 'even' : 'odd');
assertEq('groupBy even', grouped.even, [2, 4]);
assertEq('groupBy odd', grouped.odd, [1, 3]);

// ── String ────────────────────────────────────────────────────────────────────
console.log('\nString Utilities');
assertEq('capitalizeWords', UtilityHelpers.capitalizeWords('hello world'), 'Hello World');
assertEq('pluralize regular', UtilityHelpers.pluralize('cat', 2), 'cats');
assertEq('pluralize irregular', UtilityHelpers.pluralize('child', 2), 'children');
assertEq('pluralize singular', UtilityHelpers.pluralize('cat', 1), 'cat');
assertEq('pluralize uncountable', UtilityHelpers.pluralize('physics', 2), 'physics');
assertEq('escapeHtml', UtilityHelpers.escapeHtml('<div>&</div>'), '&lt;div&gt;&amp;&lt;/div&gt;');
assertEq('unescapeHtml round-trip', UtilityHelpers.unescapeHtml(UtilityHelpers.escapeHtml('<Hello>')), '<Hello>');
assert('randomString length 10', UtilityHelpers.randomString(10).length === 10);
assert('randomString alphanumeric', /^[A-Za-z0-9]+$/.test(UtilityHelpers.randomString(50)));
assertEq('numberToWords 0', UtilityHelpers.numberToWords(0), 'zero');
assertEq('numberToWords 123', UtilityHelpers.numberToWords(123), 'one hundred twenty-three');
assertEq('numberToWords negative', UtilityHelpers.numberToWords(-5), 'negative five');
assertEq('numberToWords 1000', UtilityHelpers.numberToWords(1000), 'one thousand');
assertEq('camelCase kebab', UtilityHelpers.camelCase('hello-world'), 'helloWorld');
assertEq('camelCase snake', UtilityHelpers.camelCase('hello_world'), 'helloWorld');
assertEq('kebabCase', UtilityHelpers.kebabCase('helloWorld'), 'hello-world');
assertEq('snakeCase', UtilityHelpers.snakeCase('helloWorld'), 'hello_world');
assertEq('truncate long', UtilityHelpers.truncate('This is a very long string', 10), 'This is a ...');
assertEq('truncate short', UtilityHelpers.truncate('Short', 10), 'Short');
assertEq('stripHtml', UtilityHelpers.stripHtml('<p>Hello <b>world</b></p>'), 'Hello world');
assertEq('escapeRegex', UtilityHelpers.escapeRegex('a.b*'), 'a\\.b\\*');

// ── Object ────────────────────────────────────────────────────────────────────
console.log('\nObject Utilities');
assertEq('pick', UtilityHelpers.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 });
assertEq('omit', UtilityHelpers.omit({ a: 1, b: 2, c: 3 }, ['b']), { a: 1, c: 3 });
assert('isEqual true', UtilityHelpers.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
assert('isEqual false', !UtilityHelpers.isEqual({ a: 1 }, { a: 2 }));
assertEq('deepMerge', UtilityHelpers.deepMerge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
assertEq('getType array', UtilityHelpers.getType([]), 'array');
assertEq('getType object', UtilityHelpers.getType({}), 'object');
assertEq('getType number', UtilityHelpers.getType(42), 'number');
assert('isObjectEmpty true', UtilityHelpers.isObjectEmpty({}));
assert('isObjectEmpty false', !UtilityHelpers.isObjectEmpty({ a: 1 }));

// ── General ───────────────────────────────────────────────────────────────────
console.log('\nGeneral Utilities');
assert('generateUUID format', /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(UtilityHelpers.generateUUID()));
assertEq('rgbToHex', UtilityHelpers.rgbToHex(255, 0, 0), '#ff0000');
assertEq('rgbToHex string input', UtilityHelpers.rgbToHex('rgb(120, 150, 200)'), '#7896c8');
assertEq('limitDecimalPlaces', UtilityHelpers.limitDecimalPlaces(1.23456, 2), 1.23);
assert('generateRandomColor format', /^#[0-9a-f]{6}$/i.test(UtilityHelpers.generateRandomColor()));
assertEq('getQueryParams', UtilityHelpers.getQueryParams('?a=1&b=2'), { a: '1', b: '2' });
assertEq('levenshteinDistance', UtilityHelpers.levenshteinDistance('kitten', 'sitting'), 3);
assertEq('clamp above max', UtilityHelpers.clamp(10, 0, 5), 5);
assertEq('clamp below min', UtilityHelpers.clamp(-1, 0, 5), 0);
assertEq('clamp in range', UtilityHelpers.clamp(3, 0, 5), 3);
assertEq('parseJSON valid', UtilityHelpers.parseJSON('{"a":1}'), { a: 1 });
assertEq('parseJSON invalid fallback', UtilityHelpers.parseJSON('bad', {}), {});
assertEq('getFileExtension', UtilityHelpers.getFileExtension('image.png'), 'png');
assertEq('getFileExtension no ext', UtilityHelpers.getFileExtension('README'), '');
const encoded = UtilityHelpers.shortenURL('https://example.com/path?q=hello');
assertEq('expandURL round-trip', UtilityHelpers.expandURL(encoded), 'https://example.com/path?q=hello');

// ── Performance ───────────────────────────────────────────────────────────────
console.log('\nPerformance & Optimization');
let calls = 0;
const memoized = UtilityHelpers.memoize(x => { calls++; return x * 2; });
memoized(5); memoized(5); memoized(5);
assert('memoize: fn called once for same args', calls === 1);
assertEq('memoize: correct result', memoized(5), 10);

let count = 0;
const once = UtilityHelpers.once(() => ++count);
once(); once(); once();
assert('once: fn runs only once', count === 1);

assertEq('pipe', UtilityHelpers.pipe(x => x + 1, x => x * 2)(1), 4);
assertEq('compose', UtilityHelpers.compose(x => x + 1, x => x * 2)(1), 3);

// ── Validation ────────────────────────────────────────────────────────────────
console.log('\nValidation');
assert('isValidEmail valid', UtilityHelpers.isValidEmail('test@example.com'));
assert('isValidEmail invalid', !UtilityHelpers.isValidEmail('notanemail'));
assert('isValidURL valid', UtilityHelpers.isValidURL('https://example.com'));
assert('isValidURL invalid', !UtilityHelpers.isValidURL('not a url'));

const textResult = UtilityHelpers.validateText("It's fine, right?", {});
assert('validateText preserves apostrophe', textResult.sanitized.includes("'"));
assert('validateText strips angle brackets', !UtilityHelpers.validateText('hello <script>', {}).sanitized.includes('<'));

const numResult = UtilityHelpers.validateNumberInput('42', {});
assert('validateNumberInput valid', numResult.valid && numResult.sanitized === 42);
assert('validateNumberInput min', !UtilityHelpers.validateNumberInput('1', { min: 5 }).valid);
assert('validateNumberInput max', !UtilityHelpers.validateNumberInput('10', { max: 5 }).valid);
assert('validateNumberInput NaN', !UtilityHelpers.validateNumberInput('abc', {}).valid);

const emailResult = UtilityHelpers.validateEmailInput('Test@Example.COM');
assert('validateEmailInput lowercases', emailResult.valid && emailResult.sanitized === 'test@example.com');
assert('validateEmailInput invalid', !UtilityHelpers.validateEmailInput('bad').valid);

// ── Date ──────────────────────────────────────────────────────────────────────
console.log('\nDate & Time');
const start = new Date('2020-01-01');
const end = new Date('2025-01-01');
const d = UtilityHelpers.randomDateBetweenTwo(start, end);
assert('randomDateBetweenTwo in range', d >= start && d <= end);
assert('timeStampID non-empty string', typeof UtilityHelpers.timeStampID() === 'string' && UtilityHelpers.timeStampID().length > 0);
const ids = new Set(Array.from({ length: 100 }, () => UtilityHelpers.timeStampID()));
assert('timeStampID unique', ids.size === 100);

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);

if (failed > 0) {
	console.error('\n✗ Some tests failed.');
	process.exit(1);
} else {
	console.log('\n✓ All tests passed.');
}
