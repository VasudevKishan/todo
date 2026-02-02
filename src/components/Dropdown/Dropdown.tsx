import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import styles from './styles.module.css';

/* =======================
   Types
======================= */
export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  children: ReactNode;
  value: DropdownOption | null;
  onChange: (option: DropdownOption | null) => void;
  onBlur?: () => void;
}

interface DropdownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: DropdownOption | null;
  onChange: (option: DropdownOption | null) => void;
  onBlur?: () => void;
}

interface DropdownButtonProps {
  children: ReactNode;
}

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownItemProps {
  option: DropdownOption;
  onClick?: () => void;
}

interface DropdownDefaultItemProps {
  children: ReactNode;
  onClick?: () => void;
}

/* =======================
   Context
======================= */

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within <Dropdown />');
  }
  return ctx;
};

/* =======================
   Root
======================= */

const Dropdown: React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  DefaultItem: typeof DropdownDefaultItem;
} = ({ children, value, onChange, onBlur }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, value, onChange, onBlur }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

/* =======================
   Button
======================= */

const DropdownButton: React.FC<DropdownButtonProps> = ({ children }) => {
  const { open, setOpen, value, onBlur } = useDropdown();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const DropdownBtnClickHandler = () => {
    setOpen(!open);
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  return (
    <button
      ref={buttonRef}
      type='button'
      className={styles.button}
      onClick={DropdownBtnClickHandler}
      aria-haspopup='listbox'
      aria-expanded={open}
    >
      {value?.label ?? children}
    </button>
  );
};

/* =======================
   Menu
======================= */

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const { open } = useDropdown();
  if (!open) return null;

  return (
    <div className={styles.menu} role='listbox'>
      {children}
    </div>
  );
};

/* =======================
   Item
======================= */

const DropdownItem: React.FC<DropdownItemProps> = ({ option, onClick }) => {
  const { onChange, setOpen, onBlur } = useDropdown();

  return (
    <div
      // type='button'
      className={styles.item}
      role='option'
      onClick={() => {
        onClick?.();
        onChange(option);
        onBlur?.();
        setOpen(false);
      }}
    >
      {option.label}
    </div>
  );
};

/* =======================
   Default / Clear Item
======================= */

const DropdownDefaultItem: React.FC<DropdownDefaultItemProps> = ({
  children,
  onClick,
}) => {
  const { onChange, setOpen, onBlur } = useDropdown();

  return (
    <div
      // type='button'
      className={styles.item}
      onClick={() => {
        onClick?.();
        onChange(null);
        onBlur?.();
        setOpen(false);
      }}
    >
      {children}
    </div>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.DefaultItem = DropdownDefaultItem;

export default Dropdown;
