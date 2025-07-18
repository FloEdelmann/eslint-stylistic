/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */

import type { MessageIds, RuleOptions } from './types'
import { run } from '#test'
import { invalids, valids } from '#test/parsers-jsx'
import rule from './jsx-max-props-per-line'

run<RuleOptions, MessageIds>({
  name: 'jsx-max-props-per-line',
  rule,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  valid: valids<RuleOptions>(
    {
      code: '<App />',
    },
    {
      code: '<App foo />',
    },
    {
      code: '<App foo bar />',
      options: [{ maximum: 2 }],
    },
    {
      code: '<App foo bar />',
      options: [{ when: 'multiline' }],
    },
    {
      code: '<App foo {...this.props} />',
      options: [{ when: 'multiline' }],
    },
    {
      code: '<App foo bar baz />',
      options: [{ maximum: 2, when: 'multiline' }],
    },
    {
      code: '<App {...this.props} bar />',
      options: [{ maximum: 2 }],
    },
    {
      code: `
        <App
          foo
          bar
        />
      `,
    },
    {
      code: `
        <App
          foo bar
          baz
        />
      `,
      options: [{ maximum: 2 }],
    },
    {
      code: `
        <App
          foo bar
          baz
        />
      `,
      options: [{ maximum: { multi: 2 } }],
    },
    {
      code: `
        <App
          bar
          baz
        />
      `,
      options: [{ maximum: { multi: 2, single: 1 } }],
    },
    {
      code: '<App foo baz bar />',
      options: [{ maximum: { multi: 2, single: 3 } }],
    },
    {
      code: '<App {...this.props} bar />',
      options: [{ maximum: { single: 2 } }],
    },
    {
      code: `
        <App
          foo bar
          baz bor
        />
      `,
      options: [{ maximum: { multi: 2, single: 1 } }],
    },
    {
      code: '<App foo baz bar />',
      options: [{ maximum: { multi: 2 } }],
    },
    {
      code: `
        <App
          foo bar
          baz bor
        />
      `,
      options: [{ maximum: { single: 1 } }],
    },
    {
      code: `
        <App foo bar
          baz bor
        />
      `,
      options: [{ maximum: { single: 2, multi: 2 } }],
    },
    {
      code: `
        <App foo bar
          baz bor
        />
      `,
      options: [{ maximum: 2 }],
    },
    {
      code: `
        <App foo
          bar
        />
      `,
      options: [{ maximum: 1, when: 'multiline' }],
    },
  ),

  invalid: invalids<RuleOptions, MessageIds>(
    {
      code: `
        <App foo bar baz />;
      `,
      output: `
        <App foo
bar
baz />;
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App foo bar baz />;
      `,
      output: `
        <App foo bar
baz />;
      `,
      options: [{ maximum: 2 }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <App {...this.props} bar />;
      `,
      output: `
        <App {...this.props}
bar />;
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App bar {...this.props} />;
      `,
      output: `
        <App bar
{...this.props} />;
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'this.props' },
        },
      ],
    },
    {
      code: `
        <App
          foo bar
          baz
        />
      `,
      output: `
        <App
          foo
bar
          baz
        />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App
          foo {...this.props}
          baz
        />
      `,
      output: `
        <App
          foo
{...this.props}
          baz
        />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'this.props' },
        },
      ],
    },
    {
      code: `
        <App
          foo={{
          }} bar
        />
      `,
      output: `
        <App
          foo={{
          }}
bar
        />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App foo={{
        }} bar />
      `,
      output: `
        <App foo={{
        }}
bar />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App foo bar={{
        }} baz />
      `,
      output: `
        <App foo bar={{
        }}
baz />
      `,
      options: [{ maximum: 2 }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <App foo={{
        }} {...rest} />
      `,
      output: `
        <App foo={{
        }}
{...rest} />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'rest' },
        },
      ],
    },
    {
      code: `
        <App {
          ...this.props
        } bar />
      `,
      output: `
        <App {
          ...this.props
        }
bar />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App {
          ...this.props
        } {
          ...rest
        } />
      `,
      output: `
        <App {
          ...this.props
        }
{
          ...rest
        } />
      `,
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'rest' },
        },
      ],
    },
    {
      code: `
        <App
          foo={{
          }} bar baz bor
        />
      `,
      output: `
        <App
          foo={{
          }} bar
baz bor
        />
      `,
      options: [{ maximum: 2 }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <App foo bar baz />
      `,
      output: `
        <App foo
bar
baz />
      `,
      options: [{ maximum: { single: 1, multi: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App
          foo bar baz
        />
      `,
      output: `
        <App
          foo
bar
baz
        />
      `,
      options: [{ maximum: { single: 1, multi: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bar' },
        },
      ],
    },
    {
      code: `
        <App foo
          bar baz
        />
      `,
      output: `
        <App foo
          bar
baz
        />
      `,
      options: [{ maximum: { single: 1, multi: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <App foo bar
          bar baz bor
        />
      `,
      output: `
        <App foo bar
          bar baz
bor
        />
      `,
      options: [{ maximum: { single: 1, multi: 2 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bor' },
        },
      ],
    },
    {
      code: `
        <App foo bar baz bor />
      `,
      output: `
        <App foo bar baz
bor />
      `,
      options: [{ maximum: { single: 3, multi: 2 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'bor' },
        },
      ],
    },
    {
      code: `
        <App
          foo={{
          }} bar baz bor
        />
      `,
      output: `
        <App
          foo={{
          }} bar
baz bor
        />
      `,
      options: [{ maximum: { multi: 2 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <App boz fuz
          foo={{
          }} bar baz bor
        />
      `,
      output: `
        <App boz fuz
          foo={{
          }} bar
baz bor
        />
      `,
      options: [{ maximum: { multi: 2, single: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'baz' },
        },
      ],
    },
    {
      code: `
        <DataTable<Items> fullscreen keyField="id" items={items}
          activeSortableColumn={sorting}
          onSortClick={handleSortedClick}
          rowActions={[
          ]}
        />
      `,
      features: ['ts', 'no-babel-old'],
      output: `
        <DataTable<Items> fullscreen
keyField="id"
items={items}
          activeSortableColumn={sorting}
          onSortClick={handleSortedClick}
          rowActions={[
          ]}
        />
      `,
      options: [{ maximum: { multi: 1, single: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'keyField' },
        },
      ],
    },
    {
      code: `
        <DataTable<Items>
fullscreen keyField="id" items={items}
          activeSortableColumn={sorting}
          onSortClick={handleSortedClick}
          rowActions={[
          ]}
        />
      `,
      features: ['ts', 'no-babel-old'],
      output: `
        <DataTable<Items>
fullscreen
keyField="id"
items={items}
          activeSortableColumn={sorting}
          onSortClick={handleSortedClick}
          rowActions={[
          ]}
        />
      `,
      options: [{ maximum: { multi: 1, single: 1 } }],
      errors: [
        {
          messageId: 'newLine',
          data: { prop: 'keyField' },
        },
      ],
    },
  ),
})
