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
  id: string;
  title: string;
  description: string;
  starred: boolean;
  completed: boolean;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
