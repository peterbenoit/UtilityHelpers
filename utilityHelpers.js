class UtilityHelpers {
	// Get basic image details (width, height, size, etc.)
	static getImageDetails(imageSrc, calculateAverageColor = false) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				fetch(imageSrc)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.blob();
					})
					.then((blob) => {
						const aspectRatio = (img.width / img.height).toFixed(2);
						const imageDetails = {
							width: img.width,
							height: img.height,
							size: UtilityHelpers.formatBytes(blob.size),
							mimeType: blob.type,
							aspectRatio: aspectRatio,
							orientation: UtilityHelpers.getImageOrientation(img),
							format: UtilityHelpers.getImageFormat(blob.type)
						};

						if (calculateAverageColor) {
							UtilityHelpers.getAverageImageColor(imageSrc)
								.then((averageColor) => {
									imageDetails.averageColor = averageColor;
									resolve(imageDetails);
								})
								.catch((error) => {
									reject(error);
								});
						} else {
							resolve(imageDetails);
						}
					})
					.catch((error) => {
						reject(error);
					});
			};
			img.onerror = (error) => {
				reject(error);
			};
			img.src = imageSrc;
		});
	}

	// Determine image orientation: landscape, portrait, or square
	static getImageOrientation(image) {
		if (image.width > image.height) {
			return "landscape";
		} else if (image.width < image.height) {
			return "portrait";
		} else {
			return "square";
		}
	}

	// Format bytes to a human-readable format
	static formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	}

	// Get "user friendly" image format (e.g., JPEG, PNG) based on MIME type
	static getImageFormat(mimeType) {
		switch (mimeType) {
			case "image/jpeg":
				return "JPEG";
			case "image/png":
				return "PNG";
			case "image/gif":
				return "GIF";
			case "image/webp":
				return "WEBP";
			default:
				return "Unknown format";
		}
	}

	// Calculate average color (existing)
	static getAverageImageColor(imageSrc) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "Anonymous"; // Handle cross-origin images
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const context = canvas.getContext("2d");
				context.drawImage(img, 0, 0, img.width, img.height);
				const imageData = context.getImageData(0, 0, img.width, img.height).data;

				let r = 0,
					g = 0,
					b = 0;
				for (let i = 0; i < imageData.length; i += 4) {
					r += imageData[i];
					g += imageData[i + 1];
					b += imageData[i + 2];
				}
				r = Math.floor(r / (imageData.length / 4));
				g = Math.floor(g / (imageData.length / 4));
				b = Math.floor(b / (imageData.length / 4));
				resolve(`rgb(${r},${g},${b})`);
			};
			img.onerror = (error) => {
				reject(error);
			};
			img.src = imageSrc;
		});
	}

	static generateUUID() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	static shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	static flattenArray(arr) {
		return arr.reduce(
			(flat, next) =>
				flat.concat(Array.isArray(next) ? UtilityHelpers.flattenArray(next) : next),
			[]
		);
	}

	// Sum all values in an array
	static sumArray(arr) {
		return arr.reduce((acc, val) => acc + val, 0);
	}

	// Merge two objects deeply, combining nested objects.
	static deepMerge(target, source) {
		for (const key of Object.keys(source)) {
			if (source[key] instanceof Object && key in target) {
				Object.assign(
					source[key],
					UtilityHelpers.deepMerge(target[key], source[key])
				);
			}
		}
		return Object.assign(target || {}, source);
	}

	// Count the number of unique elements in an array
	static countUniqueElements(arr) {
		return new Set(arr).size;
	}

	// Differentiate between plain objects, arrays, and other data types.
	static getType(value) {
		if (Array.isArray(value)) return "array";
		if (value !== null && typeof value === "object") return "object";
		return typeof value;
	}

	// Identify all duplicate elements in an array.
	static findDuplicates(arr) {
		const seen = new Set();
		const duplicates = new Set();

		arr.forEach((item) => {
			if (seen.has(item)) {
				duplicates.add(item);
			} else {
				seen.add(item);
			}
		});

		return [...duplicates];
	}

	// A fun attempt to pluralize words, which can in fact be pluralized
	static pluralize(word, count) {
		const irregularPlurals = {
			billiards: "billiards",
			child: "children",
			person: "people",
			mouse: "mice",
			goose: "geese",
			man: "men",
			woman: "women",
			tooth: "teeth",
			foot: "feet",
			cactus: "cacti",
			focus: "foci",
			fungus: "fungi",
			nucleus: "nuclei",
			radius: "radii",
			syllabus: "syllabi",
			thesis: "theses",
			analysis: "analyses",
			crisis: "crises",
			diagnosis: "diagnoses",
			oasis: "oases",
			phenomenon: "phenomena",
			criterion: "criteria",
			bacterium: "bacteria",
			octopus: 'octopuses',
			'cul-de-sac': 'culs-de-sac',
			lasagna: 'lasagne'
		};

		const uncountableWords = [
			"acoustics",
			"aerobics",
			"aerodynamics",
			"aeronautics",
			"athletics",
			"classics",
			"economics",
			"electronics",
			"genetics",
			"linguistics",
			"logistics",
			"mathematics",
			"mechanics",
			"obstetrics",
			"physics",
			"politics",
			"statistics",
			"thermodynamics",
			"billiards",
			"bowls",
			"cards",
			"darts",
			"draughts",
			"skittles",
			"diabetes",
			"measles",
			"mumps",
			"rabies",
			"rickets",
			"shingles",
			"biceps",
			"spaghetti"
		];

		// Check if word is uncountable (doesn't change in plural form)
		if (uncountableWords.includes(word.toLowerCase())) {
			return word;
		}

		// Check for irregular plurals, changes form
		if (irregularPlurals[word]) {
			return count === 1 ? word : irregularPlurals[word];
		}

		// Default pluralization for regular words (e.g., adding 's' or 'es')
		return count === 1 ? word : word + (word.endsWith("s") ? "es" : "s");
	}

	// Generate a random date between two given dates.
	static randomDateBetweenTwo(start, end) {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
	}

	// Count how many times a specific value appears in an array.
	static countOccurrences(arr, val) {
		return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
	}

	// Select a random element from an array
	static getRandomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// Calculate the median value of an array, which is the middle number in a sorted list.
	static getMedian(arr) {
		const sortedArr = arr.slice().sort((a, b) => a - b);
		const mid = Math.floor(sortedArr.length / 2);

		return sortedArr.length % 2 !== 0
			? sortedArr[mid]
			: (sortedArr[mid - 1] + sortedArr[mid]) / 2;
	}

	// Create an array that contains a range of numbers between two values.
	static range(start, end, step = 1) {
		const arr = [];
		for (let i = start; i <= end; i += step) {
			arr.push(i);
		}
		return arr;
	}

	static getQueryParams(url) {
		const params = {};
		const queryString = url.split("?")[1];
		if (queryString) {
			queryString.split("&").forEach((param) => {
				const [key, value] = param.split("=");
				params[decodeURIComponent(key)] = decodeURIComponent(value);
			});
		}
		return params;
	}

	static isObjectEmpty(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	static wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static capitalizeWords(str) {
		return str.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	// Convert an rgb string to a hex string
	// rgbToHex(120, 150, 200) => '#789cc8'
	// rgbToHex("rgb(120, 150, 200)") => '#789cc8'
	static rgbToHex(r, g = null, b = null) {
		if (typeof r === "string") {
			// Extract the r, g, b values from the rgb string
			const rgbValues = r.match(/\d+/g).map(Number);
			r = rgbValues[0];
			g = rgbValues[1];
			b = rgbValues[2];
		}

		// Ensure r, g, b are numbers and within range 0-255
		const toHex = (value) => value.toString(16).padStart(2, "0");

		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	// Limit a number to a specific number of decimal places.
	static limitDecimalPlaces(num, places) {
		return parseFloat(num.toFixed(places));
	}

	// Generate a unique ID based on the current timestamp.
	static timeStampID() {
		return Date.now().toString(36) + Math.random().toString(36).substring(2);
	}

	static escapeHtml(str) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;"
		};
		return str.replace(/[&<>"']/g, function (m) {
			return map[m];
		});
	}

	// Reverse of escaping HTML entities, converting safe HTML back to original characters.
	static unescapeHtml(str) {
		const map = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": '"',
			"&#39;": "'"
		};
		return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function (m) {
			return map[m];
		});
	}

	static randomString(length) {
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	}

	// Convert a numerical value into its English word equivalent (useful for writing out large numbers).
	// within reason.
	static numberToWords(num) {
		if (num === 0) return "zero";

		const a = [
			"",
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
			"ten",
			"eleven",
			"twelve",
			"thirteen",
			"fourteen",
			"fifteen",
			"sixteen",
			"seventeen",
			"eighteen",
			"nineteen"
		];
		const b = [
			"",
			"",
			"twenty",
			"thirty",
			"forty",
			"fifty",
			"sixty",
			"seventy",
			"eighty",
			"ninety"
		];
		const scales = [
			"",
			"thousand",
			"million",
			"billion",
			"trillion",
			"quadrillion",
			"quintillion",
			"sextillion"
		];

		const convertHundreds = (n) => {
			if (n < 20) return a[n];
			const tens = Math.floor(n / 10);
			const units = n % 10;
			return b[tens] + (units ? "-" + a[units] : "");
		};

		const convertChunk = (n) => {
			const hundreds = Math.floor(n / 100);
			const remainder = n % 100;
			const words = [];
			if (hundreds) words.push(a[hundreds] + " hundred");
			if (remainder) words.push(convertHundreds(remainder));
			return words.join(" ");
		};

		const chunks = [];
		let scaleIndex = 0;

		while (num > 0) {
			const chunk = num % 1000;
			if (chunk > 0) {
				const chunkWords = convertChunk(chunk);
				if (scaleIndex > 0 && chunkWords) {
					chunks.unshift(chunkWords + " " + scales[scaleIndex]);
				} else {
					chunks.unshift(chunkWords);
				}
			}
			num = Math.floor(num / 1000);
			scaleIndex++;
		}

		return chunks.join(" ").trim();
	}

	/**
		When to Use Throttle vs. Debounce:
		*
		* 	Use Throttle when you want to limit how frequently a function can
		* 	be called during continuous events (e.g., scrolling, resizing, mouse move).
		* 	It ensures that the function runs at steady intervals.
		*	Example: Update the position of an element on the page as the user scrolls
		* 	(e.g., a sticky navigation bar).
		*
		*	Use Debounce when you want the function to run only after the user has
		*	stopped performing the action (e.g., typing, resizing). It helps avoid
		*	unnecessary processing while the user is still interacting.
		*	Example: Submit a search query only when the user has finished typing.
	**/

	// Useful to limit how often a function is executed (e.g., limiting search requests while typing).
	static debounce(fn, delay) {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), delay);
		};
	}

	// Like debounce, but ensures the function runs at most once per specified time period.
	static throttle(fn, limit) {
		let lastFn, lastRan;
		return function (...args) {
			if (!lastRan) {
				fn.apply(this, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFn);
				lastFn = setTimeout(() => {
					if (Date.now() - lastRan >= limit) {
						fn.apply(this, args);
						lastRan = Date.now();
					}
				}, limit - (Date.now() - lastRan));
			}
		};
	}

	// The Levenshtein distance measures how many single-character edits
	// (insertions, deletions, or substitutions) are needed to change one string into another.
	// This is useful for fuzzy string matching.
	static levenshteinDistance(str1, str2) {
		const matrix = [];

		for (let i = 0; i <= str1.length; i++) {
			matrix[i] = [i];
		}
		for (let j = 0; j <= str2.length; j++) {
			matrix[0][j] = j;
		}

		for (let i = 1; i <= str1.length; i++) {
			for (let j = 1; j <= str2.length; j++) {
				if (str1[i - 1] === str2[j - 1]) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1] + 1, // substitution
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1 // deletion
					);
				}
			}
		}

		return matrix[str1.length][str2.length];
	}

	static getURLParts(url) {
		const a = document.createElement("a");
		a.href = url;

		return {
			protocol: a.protocol, 		// e.g., 'https:'
			host: a.host, 				// e.g., 'example.com:3000'
			hostname: a.hostname, 		// e.g., 'example.com'
			port: a.port, 				// e.g., '3000'
			pathname: a.pathname, 		// e.g., '/path/to/page'
			search: a.search, 			// e.g., '?id=123'
			hash: a.hash, 				// e.g., '#section'
			origin: a.origin, 			// e.g., 'https://example.com:3000'
			queryParams: UtilityHelpers.getQueryParams(url) // Optional: extracted query parameters
		};
	}

	static copyToClipboard(text) {
		if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
			return navigator.clipboard.writeText(text);
		}

		const tempInput = document.createElement("input");
		tempInput.style.position = "absolute";
		tempInput.style.left = "-9999px";
		tempInput.value = text;
		document.body.appendChild(tempInput);
		tempInput.select();
		const success = document.execCommand("copy");
		document.body.removeChild(tempInput);
		return Promise.resolve(success);
	}

	// Smooth scroll to an element on the page
	static smoothScrollTo(selector) {
		const element = document.querySelector(selector);
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: "smooth"
			});
		}
	}

	static generateRandomColor() {
		return (
			"#" +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, "0")
		);
	}

	// This can be useful for triggering animations or transitions after a delay.
	static toggleClassAfterDelay(element, className, delay) {
		setTimeout(() => {
			element.classList.toggle(className);
		}, delay);
	}

	// Detect how long the user has been idle (no mouse, keyboard, or touch input). This could be used for automatic logout, notifications, etc.
	static detectUserIdleTime(callback, idleTime = 60000) {
		let timeout;

		const resetTimer = () => {
			clearTimeout(timeout);
			timeout = setTimeout(callback, idleTime); // Trigger callback after user is idle
		};

		["mousemove", "keydown", "touchstart"].forEach((event) => {
			window.addEventListener(event, resetTimer);
		});

		resetTimer();
	}

	// Extract all form data and return it as a JavaScript object.
	static getFormData(formElement) {
		const formData = new FormData(formElement);
		return Array.from(formData.entries()).reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
	}

	// Generate and trigger a file download from a blob, which is helpful when dealing with generated data like CSVs or PDFs.
	static downloadFile(blob, filename) {
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(link.href);
	}

	// Go fullscreen with the document or a specific element
	static toggleFullscreen(element = document.documentElement) {
		if (!document.fullscreenElement) {
			element.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enter fullscreen mode: ${err.message}`);
			});
		} else {
			document.exitFullscreen();
		}
	}

	// Automatically load images only when they are scrolled into view to improve performance,
	static lazyLoadImages(selector = 'img[data-src]') {
		const images = document.querySelectorAll(selector);
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.removeAttribute('data-src');
					observer.unobserve(img);
				}
			});
		});

		images.forEach(img => observer.observe(img));
	}

	// Memoize expensive function calls, caching the results for subsequent identical inputs to improve performance.
	static memoize(fn) {
		const cache = new Map();
		return function (...args) {
			const key = JSON.stringify(args);
			if (cache.has(key)) {
				return cache.get(key);
			}
			const result = fn.apply(this, args);
			cache.set(key, result);
			return result;
		};
	}

	// Get the value of a CSS variable from the root element or any specified element.
	static getCSSVariable(variableName, element = document.documentElement) {
		return getComputedStyle(element).getPropertyValue(variableName);
	}

	// Set or update the value of a CSS variable
	static setCSSVariable(variableName, value, element = document.documentElement) {
		element.style.setProperty(variableName, value);
	}

	// Base64-url encode/decode helpers (not a URL shortener)
	static shortenURL(url) {
		return btoa(encodeURIComponent(url))
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/g, "");
	}

	static expandURL(shortenedURL) {
		const base64 = shortenedURL
			.replace(/-/g, "+")
			.replace(/_/g, "/")
			.padEnd(Math.ceil(shortenedURL.length / 4) * 4, "=");
		return decodeURIComponent(atob(base64));
	}

	// Save and restore scroll position
	static saveScrollPosition() {
		localStorage.setItem('scrollPos', window.scrollY);
	}

	static restoreScrollPosition() {
		const scrollPos = localStorage.getItem('scrollPos');
		if (scrollPos !== null) {
			window.scrollTo(0, parseInt(scrollPos, 10));
		}
	}

	// Run multiple asynchronous functions (like API calls) in parallel and gather the results once all are complete.
	static runInParallel(tasks) {
		return Promise.all(tasks);
	}

	// if window.speechSynthesis is available, speak the text
	static textToSpeech(text) {
		if ('speechSynthesis' in window) {
			const synth = window.speechSynthesis;
			const utterance = new SpeechSynthesisUtterance(text);
			synth.speak(utterance);
		} else {
			console.error("Speech Synthesis not supported in this browser.");
		}
	}

	// Debounce an input event with a delay
	static debouncedInput(inputElement, callback, delay = 300) {
		inputElement.addEventListener('input', UtilityHelpers.debounce(callback, delay));
	}

	// Convert an image to Base64 format, which can be useful for uploading images or
	// saving them locally in some applications.
	static getImageBase64(imageSrc, options = {}) {
		const {
			format = "image/png",
			quality = 0.92
		} = options;
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const context = canvas.getContext("2d");
				context.drawImage(img, 0, 0);
				const safeFormat = typeof format === "string" && format ? format : "image/png";
				resolve(canvas.toDataURL(safeFormat, quality));
			};
			img.onerror = (error) => {
				reject(error);
			};
			img.src = imageSrc;
		});
	}

	// Check the contrast between two colors (useful for making sure text is readable against a background color).
	static getLuminance(color) {
		const rgb = color.match(/\d+/g).map(Number);
		const [r, g, b] = rgb.map((c) => {
			c /= 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	static getContrastRatio(color1, color2) {
		const luminance1 = UtilityHelpers.getLuminance(color1);
		const luminance2 = UtilityHelpers.getLuminance(color2);
		return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
	}


	// Validating "friendly" input. All real validation should be done in the backend.
	static validateAndSanitizeInput(inputElement, type = 'text', options = {}) {
		let sanitizedInput = inputElement.value.trim();

		if (inputElement.required && !sanitizedInput) {
			return { valid: false, error: 'This field is required.' };
		}

		if (!inputElement.checkValidity()) {
			const validity = inputElement.validity;

			if (validity.patternMismatch) {
				return { valid: false, error: 'Invalid format.' };
			}
			if (validity.tooLong) {
				return { valid: false, error: `Input exceeds maximum length of ${inputElement.maxLength}.` };
			}
			if (validity.rangeUnderflow) {
				return { valid: false, error: `Value is below the minimum of ${inputElement.min}.` };
			}
			if (validity.rangeOverflow) {
				return { valid: false, error: `Value exceeds the maximum of ${inputElement.max}.` };
			}

			return { valid: false, error: 'Invalid input.' };
		}

		switch (type) {
			case 'text':
				sanitizedInput = sanitizedInput.replace(/[^a-zA-Z0-9\s]/g, '');
				if (options.maxLength && sanitizedInput.length > options.maxLength) {
					return { valid: false, error: `Text exceeds maximum length of ${options.maxLength}` };
				}
				break;

			case 'email':
				sanitizedInput = sanitizedInput.toLowerCase();
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(sanitizedInput)) {
					return { valid: false, error: 'Invalid email format' };
				}
				break;

			case 'number':
				sanitizedInput = sanitizedInput.replace(/[^\d]/g, '');
				const numValue = parseFloat(sanitizedInput);
				if (isNaN(numValue)) {
					return { valid: false, error: 'Invalid number format' };
				}
				if (options.min !== undefined && numValue < options.min) {
					return { valid: false, error: `Number is less than minimum value of ${options.min}` };
				}
				if (options.max !== undefined && numValue > options.max) {
					return { valid: false, error: `Number exceeds maximum value of ${options.max}` };
				}
				sanitizedInput = numValue;
				break;

			case 'textarea':
				sanitizedInput = sanitizedInput.replace(/<[^>]+>/g, '');
				if (options.maxLength && sanitizedInput.length > options.maxLength) {
					return { valid: false, error: `Text exceeds maximum length of ${options.maxLength}` };
				}
				break;

			default:
				return { valid: false, error: 'Unsupported input type' };
		}

		return { valid: true, sanitized: sanitizedInput };
	}
}

UtilityHelpers.getImageDetails(
	"https://assets.codepen.io/252820/nathan-dumlao--unsplash.jpg"
)
	.then((details) => console.log("Image details:", details))
	.catch((error) => console.error(error));

// include getAverageImageColor in the calculations
UtilityHelpers.getImageDetails(
	"https://assets.codepen.io/252820/nathan-dumlao--unsplash.jpg",
	true
)
	.then((details) => console.log("Image details with average color:", details))
	.catch((error) => console.error(error));

UtilityHelpers.getAverageImageColor(
	"https://assets.codepen.io/252820/nathan-dumlao--unsplash.jpg"
)
	.then((color) => console.log("Average color:", UtilityHelpers.rgbToHex(color)))
	.catch((error) => console.error(error));

const img = new Image();
img.src = "https://assets.codepen.io/252820/nathan-dumlao--unsplash.jpg";
img.onload = () => {
	const orientation = UtilityHelpers.getImageOrientation(img);
	console.log("Image orientation:", orientation);
};
