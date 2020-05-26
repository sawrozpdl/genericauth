export const collectObject = (source: any, array: any, accessor: any) =>
  source.filter((val: any) => array.includes(val[accessor]));
