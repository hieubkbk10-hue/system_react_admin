import { ModuleCategory } from '../types/moduleConfig';

// Color scheme by category
export const categoryColors: Record<ModuleCategory, {
  primary: string;
  bg: string;
  text: string;
  border: string;
  button: string;
  buttonHover: string;
}> = {
  content: {
    primary: 'cyan',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
    button: 'bg-cyan-600',
    buttonHover: 'hover:bg-cyan-500',
  },
  commerce: {
    primary: 'emerald',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
    button: 'bg-emerald-600',
    buttonHover: 'hover:bg-emerald-500',
  },
  user: {
    primary: 'purple',
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
    button: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-500',
  },
  system: {
    primary: 'orange',
    bg: 'bg-orange-500/10',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/20',
    button: 'bg-orange-600',
    buttonHover: 'hover:bg-orange-500',
  },
  marketing: {
    primary: 'pink',
    bg: 'bg-pink-500/10',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-500/20',
    button: 'bg-pink-600',
    buttonHover: 'hover:bg-pink-500',
  },
};

// Toggle switch colors by category
export const toggleColors: Record<ModuleCategory, string> = {
  content: 'bg-cyan-500',
  commerce: 'bg-emerald-500',
  user: 'bg-purple-500',
  system: 'bg-orange-500',
  marketing: 'bg-pink-500',
};
