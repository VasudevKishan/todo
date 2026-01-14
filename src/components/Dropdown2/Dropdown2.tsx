import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface Dropdown2Props {
  value: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string | null) => void;
}

const Dropdown2 = ({ value, options, onChange }: Dropdown2Props) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    if (value)
      setLabel(
        options.find((option) => option.value === value)?.label || 'Select'
      );
  }, []);
  return (
    <div className={styles.dropdown}>
      <button
        type='button'
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        {label ?? 'Select'}
      </button>
      {open && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.item}
              onClick={() => {
                onChange(option.value ?? 'Select');
                setLabel(option.label);
                setOpen(false);
              }}
              role='menuitem'
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
