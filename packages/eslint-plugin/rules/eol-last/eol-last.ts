/**
 * @fileoverview Require or disallow newline at the end of files
 * @author Nodeca Team <https://github.com/nodeca>
 */

import type { MessageIds, RuleOptions } from './types'
import { createRule } from '#utils/create-rule'
import { warnDeprecation } from '#utils/index'

export default createRule<RuleOptions, MessageIds>({
  name: 'eol-last',
  meta: {
    type: 'layout',

    docs: {
      description: 'Require or disallow newline at the end of files',
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'string',
        enum: ['always', 'never', 'unix', 'windows'],
      },
    ],

    messages: {
      missing: 'Newline required at end of file but not found.',
      unexpected: 'Newline not allowed at end of file.',
    },
  },
  create(context) {
    return {
      Program: function checkBadEOF(node) {
        const sourceCode = context.sourceCode
        const src = sourceCode.getText()
        const lastLine = sourceCode.lines[sourceCode.lines.length - 1]
        const location = {
          column: lastLine.length,
          line: sourceCode.lines.length,
        }
        const LF = '\n'
        const CRLF = `\r${LF}`
        const endsWithNewline = src.endsWith(LF)

        /**
         * Empty source is always valid: No content in file so we don't
         * need to lint for a newline on the last line of content.
         */
        if (!src.length)
          return

        let mode = context.options[0] || 'always'
        let appendCRLF = false

        if (mode === 'unix') {
          warnDeprecation('option("unix")', '"always" and "@stylistic/eslint-plugin/rules/linebreak-style"', 'eol-last')
          // `"unix"` should behave exactly as `"always"`
          mode = 'always'
        }
        if (mode === 'windows') {
          warnDeprecation('option("windows")', '"always" and "@stylistic/eslint-plugin/rules/linebreak-style"', 'eol-last')
          // `"windows"` should behave exactly as `"always"`, but append CRLF in the fixer for backwards compatibility
          mode = 'always'
          appendCRLF = true
        }
        if (mode === 'always' && !endsWithNewline) {
          // File is not newline-terminated, but should be
          context.report({
            node,
            loc: location,
            messageId: 'missing',
            fix(fixer) {
              return fixer.insertTextAfterRange([0, src.length], appendCRLF ? CRLF : LF)
            },
          })
        }
        else if (mode === 'never' && endsWithNewline) {
          const secondLastLine = sourceCode.lines[sourceCode.lines.length - 2]

          // File is newline-terminated, but shouldn't be
          context.report({
            node,
            loc: {
              start: { line: sourceCode.lines.length - 1, column: secondLastLine.length },
              end: { line: sourceCode.lines.length, column: 0 },
            },
            messageId: 'unexpected',
            fix(fixer) {
              const finalEOLs = /(?:\r?\n)+$/u
              const match = finalEOLs.exec(sourceCode.text)! // endsWithNewline is true
              const start = match.index
              const end = sourceCode.text.length

              return fixer.replaceTextRange([start, end], '')
            },
          })
        }
      },
    }
  },
})
