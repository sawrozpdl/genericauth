import toast from './toast';

export const restoreSettings = () => {
  let settings = { theme: 'DARK' };

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    toast.info('Failed to load settings!');
  }

  return settings;
};

export const storeSettings = (settings: any) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
