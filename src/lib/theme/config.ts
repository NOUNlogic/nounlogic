export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  blur: {
    background: string;
    card: string;
    overlay: string;
  };
}

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: 'hsl(262, 83%, 58%)',
    primaryForeground: 'hsl(0, 0%, 98%)',
    secondary: 'hsl(210, 40%, 96%)',
    secondaryForeground: 'hsl(222, 84%, 5%)',
    accent: 'hsl(210, 40%, 90%)',
    accentForeground: 'hsl(222, 84%, 5%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222, 84%, 5%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222, 84%, 5%)',
    muted: 'hsl(210, 40%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',
    border: 'hsl(214, 32%, 91%)',
    input: 'hsl(214, 32%, 91%)',
    ring: 'hsl(262, 83%, 58%)',
    destructive: 'hsl(0, 84%, 60%)',
    destructiveForeground: 'hsl(0, 0%, 98%)',
    success: 'hsl(142, 76%, 36%)',
    successForeground: 'hsl(0, 0%, 98%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(0, 0%, 98%)',
  },
  gradients: {
    primary: 'from-purple-500 to-blue-600',
    secondary: 'from-gray-100 to-gray-200',
    accent: 'from-blue-500 to-purple-600',
    background: 'from-white to-gray-50',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  blur: {
    background: 'backdrop-blur-sm',
    card: 'backdrop-blur-md',
    overlay: 'backdrop-blur-lg',
  },
};

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: 'hsl(262, 83%, 58%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(217, 33%, 17%)',
    secondaryForeground: 'hsl(210, 40%, 98%)',
    accent: 'hsl(217, 33%, 17%)',
    accentForeground: 'hsl(210, 40%, 98%)',
    background: 'hsl(222, 84%, 5%)',
    foreground: 'hsl(210, 40%, 98%)',
    card: 'hsl(222, 84%, 5%)',
    cardForeground: 'hsl(210, 40%, 98%)',
    muted: 'hsl(217, 33%, 17%)',
    mutedForeground: 'hsl(215, 20%, 65%)',
    border: 'hsl(217, 33%, 17%)',
    input: 'hsl(217, 33%, 17%)',
    ring: 'hsl(262, 83%, 58%)',
    destructive: 'hsl(0, 62%, 30%)',
    destructiveForeground: 'hsl(0, 0%, 98%)',
    success: 'hsl(142, 76%, 36%)',
    successForeground: 'hsl(0, 0%, 98%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(0, 0%, 98%)',
  },
  gradients: {
    primary: 'from-purple-500 to-blue-600',
    secondary: 'from-slate-800 to-slate-900',
    accent: 'from-blue-500 to-purple-600',
    background: 'from-slate-900 via-slate-950 to-slate-900',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
  blur: {
    background: 'backdrop-blur-sm',
    card: 'backdrop-blur-xl',
    overlay: 'backdrop-blur-lg',
  },
};