import type { Registry } from '../registry/schema'
import { hooks } from '../registry/registry-hooks'
import { lib } from '../registry/registry-lib'
import { themes } from '../registry/registry-themes'
import { ui } from '../registry/registry-ui'

export const registry: Registry = [
  ...ui,
  ...lib,
  ...hooks,
  ...themes,
]
