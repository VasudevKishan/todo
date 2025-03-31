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
