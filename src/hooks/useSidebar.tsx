import { useContext } from 'react';
import { SidebarContextProps } from '../context/helper';
import { SidebarContext } from '../context/SidebarContext';
export const useSidebar = (): SidebarContextProps => {
  const context = useContext<SidebarContextProps | undefined>(SidebarContext);
  if (!context) {
    throw new Error('UseSidebar must be used within context provider');
  }

  return context;
};
