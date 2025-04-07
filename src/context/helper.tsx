export type Theme = "light" | "dark";

export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export type UserAction = "edit" | "view" | "detail";

export interface UserActionContextProps {
    action: UserAction;
    changeAction: (userAction: UserAction) => void;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    starred: boolean;
}

export interface TaskContextProps {
    tasks: Task[];
    selectedTask: Task;
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
    generateUniqueId: () => number;
    selectTask: (task: Task) => void;
    userState: "new" | "edit";
    changeState: (state: "new" | "edit") => void;
}
