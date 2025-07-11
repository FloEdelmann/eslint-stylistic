/**
 * @fileoverview Tests for one-var-declaration-per-line rule.
 * @author Alberto Rodríguez
 */

import type { TestCaseError } from '#test'
import type { MessageIds, RuleOptions } from './types'
import { run } from '#test'
import rule from './one-var-declaration-per-line'

// ------------------------------------------------------------------------------
// Fixtures
// ------------------------------------------------------------------------------

/**
 * Returns an error object at the specified line and column
 * @private
 * @param line line number
 * @param column column number
 * @returns Error object
 */
function errorAt(line: number, column: number): TestCaseError<MessageIds> {
  return {
    messageId: 'expectVarOnNewline',
    type: 'VariableDeclaration',
    line,
    column,
  }
}

run<RuleOptions, MessageIds>({
  name: 'one-var-declaration-per-line',
  rule,
  lang: 'js',
  valid: [
    { code: 'var a, b, c,\nd = 0;', options: ['initializations'] },
    { code: 'var a, b, c,\n\nd = 0;', options: ['initializations'] },
    { code: 'var a, b,\nc=0\nd = 0;', options: ['initializations'] },
    { code: 'let a, b;', options: ['initializations'], parserOptions: { ecmaVersion: 6 } },
    { code: 'var a = 0; var b = 0;', options: ['initializations'] },
    'var a, b,\nc=0\nd = 0;',

    { code: 'var a,\nb,\nc,\nd = 0;', options: ['always'] },
    { code: 'var a = 0,\nb;', options: ['always'] },
    { code: 'var a = 0,\n\nb;', options: ['always'] },

    { code: 'var a; var b;', options: ['always'] },
    { code: 'for(var a = 0, b = 0;;){}', options: ['always'] },
    { code: 'for(let a = 0, b = 0;;){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(const a = 0, b = 0;;){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(var a in obj){}', options: ['always'] },
    { code: 'for(let a in obj){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(const a in obj){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(var a of arr){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(let a of arr){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },
    { code: 'for(const a of arr){}', options: ['always'], parserOptions: { ecmaVersion: 6 } },

    { code: 'export let a, b;', options: ['initializations'], parserOptions: { ecmaVersion: 6, sourceType: 'module' } },
    { code: 'export let a,\n b = 0;', options: ['initializations'], parserOptions: { ecmaVersion: 6, sourceType: 'module' } },
  ],

  invalid: [
    { code: 'var foo, bar;', output: 'var foo, \nbar;', options: ['always'], errors: [{ line: 1, column: 10, endLine: 1, endColumn: 13 }] },
    { code: 'var a, b;', output: 'var a, \nb;', options: ['always'], errors: [errorAt(1, 8)] },
    { code: 'let a, b;', output: 'let a, \nb;', options: ['always'], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 8)] },
    { code: 'var a, b = 0;', output: 'var a, \nb = 0;', options: ['always'], errors: [errorAt(1, 8)] },
    { code: 'var a = {\n foo: bar\n}, b;', output: 'var a = {\n foo: bar\n}, \nb;', options: ['always'], errors: [errorAt(3, 4)] },
    { code: 'var a\n=0, b;', output: 'var a\n=0, \nb;', options: ['always'], errors: [errorAt(2, 5)] },
    { code: 'let a, b = 0;', output: 'let a, \nb = 0;', options: ['always'], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 8)] },
    { code: 'const a = 0, b = 0;', output: 'const a = 0, \nb = 0;', options: ['always'], parserOptions: { ecmaVersion: 6 }, errors: [errorAt(1, 14)] },

    { code: 'var foo, bar, baz = 0;', output: 'var foo, bar, \nbaz = 0;', options: ['initializations'], errors: [{ line: 1, column: 15, endLine: 1, endColumn: 22 }] },
    { code: 'var a, b, c = 0;', output: 'var a, b, \nc = 0;', options: ['initializations'], errors: [errorAt(1, 11)] },
    { code: 'var a, b,\nc = 0, d;', output: 'var a, b,\nc = 0, \nd;', options: ['initializations'], errors: [errorAt(2, 8)] },
    { code: 'var a, b,\nc = 0, d = 0;', output: 'var a, b,\nc = 0, \nd = 0;', options: ['initializations'], errors: [errorAt(2, 8)] },
    { code: 'var a\n=0, b = 0;', output: 'var a\n=0, \nb = 0;', options: ['initializations'], errors: [errorAt(2, 5)] },
    { code: 'var a = {\n foo: bar\n}, b;', output: 'var a = {\n foo: bar\n}, \nb;', options: ['initializations'], errors: [errorAt(3, 4)] },

    { code: 'for(var a = 0, b = 0;;){\nvar c,d;}', output: 'for(var a = 0, b = 0;;){\nvar c,\nd;}', options: ['always'], errors: [errorAt(2, 7)] },
    { code: 'export let a, b;', output: 'export let a, \nb;', options: ['always'], parserOptions: { ecmaVersion: 6, sourceType: 'module' }, errors: [errorAt(1, 15)] },
    { code: 'export let a, b = 0;', output: 'export let a, \nb = 0;', options: ['initializations'], parserOptions: { ecmaVersion: 6, sourceType: 'module' }, errors: [errorAt(1, 15)] },
  ],
})
