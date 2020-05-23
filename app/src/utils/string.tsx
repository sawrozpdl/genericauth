/**
 *
 * @param {string} string
 * @param {any} object
 * @returns {string}
 */
export const interpolate = (string: string, object: any): string => {
  Object.keys(object).forEach((key) => {
    string = string.replace(new RegExp(`:${key}`, 'g'), object[key]);
  });

  return string;
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const extractFullName = (user: any, mid = true): string => {
  const { firstName, middleName, lastName } = user;
  return `${firstName ? `${capitalize(firstName)}` : ''}${
    mid && middleName ? ` ${capitalize(middleName)}` : ''
  } ${lastName ? ` ${capitalize(lastName)}` : ''}`.trim();
};

export const extractInitials = (user: any, mid = true) =>
  `${user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}${
    mid && user.middleName ? user.middleName.charAt(0).toUpperCase() : ''
  }${user.lastName ? user.lastName.charAt(0).toUpperCase() : ''}`;

const nullCounter = (obj: any) => {
  let keyCount = 0;
  let nullCount = 0;
  for (const key in obj) {
    if (!obj[key]) {
      nullCount++;
      keyCount++;
    } else if (typeof obj[key] === 'object') {
      const count = nullCounter(obj[key]);
      keyCount += count.keyCount;
      nullCount += count.nullCount;
    } else keyCount++;
  }
  return {
    keyCount,
    nullCount,
  };
};

export const getProfileCompleteness = (user: any) => {
  const { nullCount, keyCount } = nullCounter(user);
  return ((keyCount - nullCount) / keyCount) * 100;
};
