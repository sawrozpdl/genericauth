import { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';

export default function useSettings() {
  const context: any = useContext(SettingsContext);

  return context;
}
