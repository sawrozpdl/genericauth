export function restoreSettings() {
  let settings = { direction: 'ltr', responsiveFontSizes: true, theme: 'DARK' };

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
      console.log(settings);
    }
  } catch (err) {
    // If stored data is not a strigified JSON this might fail,
    // that's why we catch the error
  }

  return settings;
}

export function storeSettings(settings: any) {
  localStorage.setItem('settings', JSON.stringify(settings));
}
