---
title: generator-star-spacing
rule_type: layout
further_reading:
  - 'https://leanpub.com/understandinges6/read/#leanpub-auto-generators'
---

# generator-star-spacing

Generators are a new type of function in ECMAScript 6 that can return multiple values over time.
These special functions are indicated by placing an `*` after the `function` keyword.

Here is an example of a generator function:

```js
function* generator() {
    yield "44";
    yield "55";
}
```

This is also valid:

```js
function *generator() {
    yield "44";
    yield "55";
}
```

This is valid as well:

```js
function * generator() {
    yield "44";
    yield "55";
}
```

To keep a sense of consistency when using generators this rule enforces a single position for the `*`.

## Rule Details

This rule aims to enforce spacing around the `*` of generator functions.

## Options

The rule takes one option, an object, which has two keys `"before"` and `"after"` having boolean values `true` or `false`.

- `"before"` enforces spacing between the `*` and the `function` keyword.
  If it is `true`, a space is required, otherwise spaces are disallowed.

  In object literal shorthand methods, spacing before the `*` is not checked, as they lack a `function` keyword.

- `"after"` enforces spacing between the `*` and the function name (or the opening parenthesis for anonymous generator functions).
  If it is `true`, a space is required, otherwise spaces are disallowed.

The default is `{"before": true, "after": false}`.

An example configuration:

```json
"generator-star-spacing": ["error", {"before": true, "after": false}]
```

And the option has shorthand as a string keyword:

- `{"before": true, "after": false}` → `"before"`
- `{"before": false, "after": true}` → `"after"`
- `{"before": true, "after": true}` → `"both"`
- `{"before": false, "after": false}` → `"neither"`

An example of shorthand configuration:

```json
"generator-star-spacing": ["error", "after"]
```

Additionally, this rule allows further configurability via overrides per function type.

- `named` provides overrides for named functions
- `anonymous` provides overrides for anonymous functions
- `method` provides overrides for class methods or property function shorthand

An example of a configuration with overrides:

```json
"generator-star-spacing": ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]
```

In the example configuration above, the top level `"before"` and `"after"` options define the default behavior of
the rule, while the `"anonymous"` and `"method"` options override the default behavior.
Overrides can be either an object with `"before"` and `"after"`, or a shorthand string as above.

## Examples

### before

Examples of **correct** code for this rule with the `"before"` option:

::: correct

```js
/* eslint @stylistic/generator-star-spacing: ["error", {"before": true, "after": false}] */

function *generator() {}

var anonymous = function *() {};

var shorthand = { *generator() {} };
```

:::

### after

Examples of **correct** code for this rule with the `"after"` option:

::: correct

```js
/* eslint @stylistic/generator-star-spacing: ["error", {"before": false, "after": true}] */

function* generator() {}

var anonymous = function* () {};

var shorthand = { * generator() {} };
```

:::

### both

Examples of **correct** code for this rule with the `"both"` option:

::: correct

```js
/* eslint @stylistic/generator-star-spacing: ["error", {"before": true, "after": true}] */

function * generator() {}

var anonymous = function * () {};

var shorthand = { * generator() {} };
```

:::

### neither

Examples of **correct** code for this rule with the `"neither"` option:

::: correct

```js
/* eslint @stylistic/generator-star-spacing: ["error", {"before": false, "after": false}] */

function*generator() {}

var anonymous = function*() {};

var shorthand = { *generator() {} };
```

:::

Examples of **incorrect** code for this rule with overrides present:

::: incorrect

```js
/* eslint @stylistic/generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}] */

function * generator() {}

var anonymous = function* () {};

var shorthand = { *generator() {} };

class Class { static* method() {} }
```

:::

Examples of **correct** code for this rule with overrides present:

::: correct

```js
/* eslint @stylistic/generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}] */

function* generator() {}

var anonymous = function*() {};

var shorthand = { * generator() {} };

class Class { static * method() {} }
```

:::

## When Not To Use It

If your project will not be using generators or you are not concerned with spacing consistency, you do not need this rule.
