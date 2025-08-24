export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface SidebarContextProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
}
