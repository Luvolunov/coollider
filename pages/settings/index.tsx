import { useEffect } from 'react';
import { setTitle } from '../../store/title';

export default function SettingsPage() {
  useEffect(() => {
    setTitle('Настройки');
  });
  return 'Settings';
}
