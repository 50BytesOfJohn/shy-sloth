const withDefault = <T>(
  promise: (
    ...args: any[]
  ) => Promise<T | undefined | void>,
  defaultValue: () => T
): ((...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    const result = await promise(...args);
    return result === undefined
      ? defaultValue()
      : result;
  };
};

export { withDefault };
