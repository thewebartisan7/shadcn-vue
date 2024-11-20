import { resolveImport } from '@/src/utils/resolve-import'
import { loadConfig as c12LoadConfig } from 'c12'
import path from 'pathe'
import { loadConfig } from 'tsconfig-paths'
import { z } from 'zod'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_TAILWIND_CSS = 'app/globals.css'
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js'
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate'
export const DEFAULT_TYPESCRIPT_CONFIG = './tsconfig.json'

export const TAILWIND_CSS_PATH = {
  nuxt: 'assets/css/tailwind.css',
  vite: 'src/assets/index.css',
  laravel: 'resources/css/app.css',
  astro: 'src/styles/globals.css',
}

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.boolean().default(true),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().default('').optional(),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional(),
      lib: z.string().optional(),
      hooks: z.string().optional(),
    }),
    iconLibrary: z.string().optional(),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  // Set default icon library if not provided.
  if (!config.iconLibrary) {
    config.iconLibrary = config.style === 'new-york' ? 'radix' : 'lucide'
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd)

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load ${config.typescript ? 'tsconfig' : 'jsconfig'}.json. ${
        tsConfig.message ?? ''
      }`.trim(),
    )
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig),
      ui: config.aliases.ui
        ? await resolveImport(config.aliases.ui, tsConfig)
        : path.resolve(
          (await resolveImport(config.aliases.components, tsConfig))
          ?? cwd,
          'ui',
        ),
      // TODO: Make this configurable.
      // For now, we assume the lib and hooks directories are one level up from the components directory.
      lib: config.aliases.lib
        ? await resolveImport(config.aliases.lib, tsConfig)
        : path.resolve(
          (await resolveImport(config.aliases.utils, tsConfig)) ?? cwd,
          '..',
        ),
      hooks: config.aliases.hooks
        ? await resolveImport(config.aliases.hooks, tsConfig)
        : path.resolve(
          (await resolveImport(config.aliases.components, tsConfig))
          ?? cwd,
          '..',
          'hooks',
        ),
    },
  })
}
export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await c12LoadConfig({
      name: 'components',
      configFile: 'components.json',
      cwd,
    })

    if (!configResult.config || Object.keys(configResult.config).length === 0)
      return null

    return rawConfigSchema.parse(configResult.config)
  }
  catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
