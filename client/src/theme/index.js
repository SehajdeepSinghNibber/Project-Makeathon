import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#2563EB', // Primary Blue
      600: '#1D4ED8', // Accent Blue
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#172554',
    },
    gray: {
      50: '#F8FAFC', // Section Background
      100: '#F1F5F9',
      200: '#E2E8F0', // Border
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569', // Text Secondary
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A', // Text Primary
    },
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'full',
        transition: 'all 0.2s',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
        }),
        outline: {
          borderWidth: '2px',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          boxShadow: 'sm',
          borderWidth: '1px',
          borderColor: 'gray.200',
          bg: 'white',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            borderColor: 'gray.200',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #2563EB',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
    }),
  },
});

export default theme;
