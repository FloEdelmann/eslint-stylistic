import type { Plugin } from 'vite'
import { basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import graymatter from 'gray-matter'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { packages } from '../../packages/metadata/src'

export default defineConfig({
  resolve: {
    alias: {
      '@eslint-stylistic/metadata': fileURLToPath(new URL('../../packages/metadata/src/index.ts', import.meta.url)),
    },
  },
  plugins: [
    Components({
      dirs: [
        fileURLToPath(new URL('./components', import.meta.url)),
      ],
      dts: fileURLToPath(new URL('../components.d.ts', import.meta.url)),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      extensions: ['vue', 'md'],
    }),
    UnoCSS(
      fileURLToPath(new URL('./uno.config.ts', import.meta.url)),
    ),
    MarkdownTransform(),
  ],
  publicDir: fileURLToPath(new URL('../public', import.meta.url)),
})

function MarkdownTransform(): Plugin {
  return {
    name: 'local:markdown-transform',
    enforce: 'pre',
    transform(code, id) {
      let shortId = /README\._(\w+)_\.md$/.exec(id)?.[1]
      if (!shortId)
        return null

      if (id.endsWith('README._merged_.md'))
        shortId = 'default'

      const ruleName = basename(dirname(id))

      const pkg = packages.find(p => p.shortId === shortId)
      const rule = pkg?.rules.find(r => r.name === ruleName)

      if (!pkg || !rule)
        return null

      let {
        data,
        content,
      } = graymatter(code)

      content = content
        .replaceAll(
          `eslint ${rule.name}:`,
          `eslint ${rule.ruleId}:`,
        )
        .replaceAll(
          '@typescript-eslint/',
          '@stylistic/ts/',
        )

      content = [
        `<p class="mb0!"><a href="/packages/${pkg.shortId}" class="font-mono no-underline!">${rule.ruleId.slice(0, -rule.name.length)}</a></p>`,
        '',
        `# <samp>${rule.name}</samp>`,
        '',
        '\n',
        content.trimStart().replace(/^# .*\n/, ''),
      ].join('\n')

      return graymatter.stringify(content, { data })
    },
  }
}
