import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

export const baseStyle = definePartsStyle(() => ({
  overlay: {
    bg: 'blackAlpha.700',
  },
  dialogContainer: {},
  dialog: {
    maxH: '80vh',
    bg: 'base.800',
  },
  header: {
    fontWeight: '600',
    fontSize: 'lg',
  },
  closeButton: {
    opacity: 0.5,
  },
  body: {
    overflowY: 'scroll',
  },
  footer: {},
}));

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: { size: 'lg' },
});
