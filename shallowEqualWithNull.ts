export const shallowEqualWithNull = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];

  for (const key of keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 === val2) {
      continue;
    }

    if (
      (val1 === undefined || val1 === null) &&
      (val2 === undefined || val2 === null)
    ) {
      continue;
    }

    return false;
  }

  return true;
};
