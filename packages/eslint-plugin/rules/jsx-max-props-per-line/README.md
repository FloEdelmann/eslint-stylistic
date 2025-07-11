# jsx-max-props-per-line

Enforce maximum of props on a single line in JSX.

## Rule Details

This rule checks all JSX elements and verifies that the number of props per line do not exceed the maximum allowed. Props are considered to be in a new line if there is a line break between the start of the prop and the end of the previous prop. A spread attribute counts as one prop. This rule is off by default and when on the default maximum of props on one line is `1`.

Examples of **incorrect** code for this rule:

::: incorrect

```jsx
/* eslint @stylistic/jsx-max-props-per-line: "error" */
<Hello lastName="Smith" firstName="John" />;

<Hello foo={{
  bar
}} baz />;
```

:::

Examples of **correct** code for this rule:

::: correct

```jsx
/* eslint @stylistic/jsx-max-props-per-line: "error" */
<Hello
  firstName="John"
  lastName="Smith"
/>;

<Hello
  {...this.props}
  firstName="John"
  lastName="Smith"
/>;
```

:::

## Rule Options

```js
...
"@stylistic/jsx-max-props-per-line": [<enabled>, { "maximum": <number>, "when": <string> }]
...

// OR

...
"@stylistic/jsx-max-props-per-line": [<enabled>, { "maximum": { "single": <number>, "multi": <number> } }]
...
```

### `maximum`

Maximum number of props allowed on a single line. Default to `1`.

Examples of **incorrect** code for this rule:

::: incorrect

```jsx
/* eslint @stylistic/jsx-max-props-per-line: ["error", { "maximum": 2 }] */

<Hello firstName="John" lastName="Smith" tel={5555555} />;
```

:::

Examples of **correct** code for this rule:

::: correct

```jsx
/* eslint @stylistic/jsx-max-props-per-line: ["error", { "maximum": 2 }] */

<Hello
  firstName="John" lastName="Smith"
  tel={5555555}
/>;
```

:::

Maximum can be specified as object `{ single: 1, multi: 1 }` to specify maximum allowed number of props for single line and multiple line tags.

### `when`

_when only applied if `maximum` is specified as number._

Possible values:

- `always` (default) - Always check for max props per line.
- `multiline` - Only check for max props per line when jsx tag spans multiple lines.

Examples of **incorrect** code for this rule:

::: incorrect

```jsx
/* eslint @stylistic/jsx-max-props-per-line: ["error", { "when": "always" }] */

<Hello firstName="John" lastName="Smith" />
```

:::

Examples of **correct** code for this rule:

::: correct

```jsx
/* eslint @stylistic/jsx-max-props-per-line: ["error", { "when": "multiline" }] */

<Hello firstName="John" lastName="Smith" />;
<Hello
  firstName="John"
  lastName="Smith"
/>;
```

:::

## When Not To Use It

If you are not using JSX then you can disable this rule.
