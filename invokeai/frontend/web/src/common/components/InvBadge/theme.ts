import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle((props) => ({
  fontSize: 10,
  px: 2,
  py: 1,
  minW: 4,
  lineHeight: 1,
  borderRadius: 'sm',
  bg: `${props.colorScheme}.300`,
  color: 'base.900',
  fontWeight: 'bold',
  letterSpacing: 1.25,
}));

export const badgeTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    variant: 'solid',
    colorScheme: 'base',
  },
});
