import type { InvokeAIThemeColors } from 'theme/themeTypes';
import { generateColorPalette } from 'theme/util/generateColorPalette';

const BASE = { H: 220, S: 0 };
// const BASE = { H: 220, S: 16 };
const ACCENT = { H: 250, S: 42 };
const WORKING = { H: 47, S: 42 };
const GOLD = { H: 40, S: 70 };
const WARNING = { H: 28, S: 42 };
const OK = { H: 113, S: 42 };
const ERROR = { H: 0, S: 42 };
const YELLOW = { H: 66, S: 92 };
const BLUE = { H: 200, S: 76 };
const GREEN = { H: 110, S: 69 };
const RED = { H: 16, S: 92 };

export const InvokeAIColors: InvokeAIThemeColors = {
  base: generateColorPalette(BASE.H, BASE.S),
  baseAlpha: generateColorPalette(BASE.H, BASE.S, true),
  accent: generateColorPalette(ACCENT.H, ACCENT.S),
  accentAlpha: generateColorPalette(ACCENT.H, ACCENT.S, true),
  working: generateColorPalette(WORKING.H, WORKING.S),
  workingAlpha: generateColorPalette(WORKING.H, WORKING.S, true),
  gold: generateColorPalette(GOLD.H, GOLD.S),
  goldAlpha: generateColorPalette(GOLD.H, GOLD.S, true),
  warning: generateColorPalette(WARNING.H, WARNING.S),
  warningAlpha: generateColorPalette(WARNING.H, WARNING.S, true),
  ok: generateColorPalette(OK.H, OK.S),
  okAlpha: generateColorPalette(OK.H, OK.S, true),
  error: generateColorPalette(ERROR.H, ERROR.S),
  errorAlpha: generateColorPalette(ERROR.H, ERROR.S, true),
  yellow: generateColorPalette(YELLOW.H, YELLOW.S),
  yellowAlpha: generateColorPalette(YELLOW.H, YELLOW.S, true),
  blue: generateColorPalette(BLUE.H, BLUE.S),
  blueAlpha: generateColorPalette(BLUE.H, BLUE.S, true),
  green: generateColorPalette(GREEN.H, GREEN.S),
  greenAlpha: generateColorPalette(GREEN.H, GREEN.S, true),
  red: generateColorPalette(RED.H, RED.S),
  redAlpha: generateColorPalette(RED.H, RED.S, true),
};

export const layerStyleBody = {
  bg: 'black',
  color: 'base.50',
} as const;
export const layerStyleFirst = {
  bg: 'base.900',
  color: 'base.50',
} as const;
export const layerStyleSecond = {
  bg: 'base.800',
  color: 'base.50',
} as const;
export const layerStyleThird = {
  bg: 'base.700',
  color: 'base.50',
} as const;
export const layerStyleNodeBody = {
  bg: 'base.800',
  color: 'base.100',
} as const;
export const layerStyleNodeHeader = {
  bg: 'base.900',
  color: 'base.100',
} as const;
export const layerStyleNodeFooter = {
  bg: 'base.900',
  color: 'base.100',
} as const;
export const layerStyleDanger = {
  color: 'error.500 !important',
} as const;