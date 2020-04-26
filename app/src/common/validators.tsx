const checked = (value: any, options: any) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

export default {
  checked,
};
