---
title: arrow-spacing
rule_type: layout
---

# arrow-spacing

This rule normalize style of spacing before/after an arrow function's arrow(`=>`).

```js
// { "before": true, "after": true }
(a) => {}

// { "before": false, "after": false }
(a)=>{}
```

## Rule Details

This rule takes an object argument with `before` and `after` properties, each with a Boolean value.

The default configuration is `{ "before": true, "after": true }`.

`true` means there should be **one or more spaces** and `false` means **no spaces**.

Examples of **incorrect** code for this rule with the default `{ "before": true, "after": true }` option:

:::incorrect

```js
/* eslint @stylistic/arrow-spacing: "error" */

()=> {};
() =>{};
(a)=> {};
(a) =>{};
a =>a;
a=> a;
()=> {'\n'};
() =>{'\n'};
```

:::

Examples of **correct** code for this rule with the default `{ "before": true, "after": true }` option:

:::correct

```js
/* eslint @stylistic/arrow-spacing: "error" */

() => {};
(a) => {};
a => a;
() => {'\n'};
```

:::

Examples of **incorrect** code for this rule with the `{ "before": false, "after": false }` option:

:::incorrect

```js
/* eslint @stylistic/arrow-spacing: ["error", { "before": false, "after": false }] */

() =>{};
(a) => {};
()=> {'\n'};
```

:::

Examples of **correct** code for this rule with the `{ "before": false, "after": false }` option:

:::correct

```js
/* eslint @stylistic/arrow-spacing: ["error", { "before": false, "after": false }] */

()=>{};
(a)=>{};
()=>{'\n'};
```

:::

Examples of **incorrect** code for this rule with the `{ "before": false, "after": true }` option:

:::incorrect

```js
/* eslint @stylistic/arrow-spacing: ["error", { "before": false, "after": true }] */

() =>{};
(a) => {};
()=>{'\n'};
```

:::

Examples of **correct** code for this rule with the `{ "before": false, "after": true }` option:

:::correct

```js
/* eslint @stylistic/arrow-spacing: ["error", { "before": false, "after": true }] */

()=> {};
(a)=> {};
()=> {'\n'};
```

:::
