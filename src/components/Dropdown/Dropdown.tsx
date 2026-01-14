import React, { createContext, useContext, useState, ReactNode } from 'react';
import styles from './styles.module.css';

interface DropdownProps {
  children: ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
}

interface DropdownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  label: string | null;
  setLabel: (label: string | null) => void;
  onChange: (value: string | null) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined
);

const Dropdown: React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  DefaultItem: typeof DropdownDefaultItem;
} = ({ children, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, value, onChange, label, setLabel }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown.Menu must be used within a Dropdown');
  return ctx;
};

interface DropdownButtonProps {
  children: ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ children }) => {
  const { open, setOpen, label } = useDropdown();
  return (
    <button className={styles.button} onClick={() => setOpen(!open)}>
      {label ?? children}
    </button>
  );
};

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const { open } = useDropdown();
  if (!open) return null;
  return <div className={styles.menu}>{children}</div>;
};

interface DropdownItemProps {
  children: string;
  value?: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  value,
  onClick,
}) => {
  const { setOpen, onChange, setLabel } = useDropdown();

  return (
    <div
      className={styles.item}
      onClick={() => {
        onClick?.();
        onChange(value ?? children);
        setLabel(children);
        setOpen(false);
      }}
      role='menuitem'
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const DropdownDefaultItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  const { setOpen, onChange } = useDropdown();

  return (
    <div
      className={styles.item}
      onClick={() => {
        onClick?.();
        onChange(null);
        setOpen(false);
      }}
    >
      {children}
    </div>
  );
};

Dropdown.DefaultItem = DropdownDefaultItem;
Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
