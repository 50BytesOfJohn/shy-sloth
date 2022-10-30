/**
 * WITH
 */

/**
 * Return default value, if promise returns undefined
 * @param promise Promise
 * @param defaultHandler Function returning default value
 * @returns Value
 */
const withDefault = <T>(
  promise: (
    ...args: any[]
  ) => Promise<T | undefined | void>,
  defaultHandler: () => T
): ((...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    const result = await promise(...args);
    return result === undefined
      ? defaultHandler()
      : result;
  };
};

const withCatch = <T, E>(
  promise: (...args: any[]) => Promise<T>,
  errorHandler: (
    error: E
  ) => Promise<T | undefined> = async () =>
    undefined
) => {
  return async (...args: any[]) => {
    try {
      return await promise(...args);
    } catch (e) {
      return await errorHandler(e as E);
    }
  };
};

const withResult = <T, U>(
  promise: (...args: any[]) => Promise<T>,
  resultHandler: (result: T) => U
): ((...args: any[]) => Promise<U>) => {
  return async (...args: any[]) => {
    return promise(...args).then(resultHandler);
  };
};

const withMappedResult = <T>(
  promise: (
    ...args: any[]
  ) => Promise<string | number>,
  map: Record<string | number, T>
): ((...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    const result = await promise(...args);
    return map[result];
  };
};

/**
 * GIVE
 */
const giveUndefined = () => undefined;

/**
 * SET
 */
const setProperty = <T>(
  obj: T,
  path: string | string[],
  separator: string = "."
) => {
  return async (value: any): Promise<T> => {
    const [head, ...rest] = Array.isArray(path)
      ? path
      : path.split(separator);

    return {
      ...obj,
      [head]: rest.length
        ? await setProperty(
            (obj as any)[head],
            rest.join(".")
          )(value)
        : value,
    };
  };
};

export {
  withDefault,
  withCatch,
  withResult,
  withMappedResult,
  giveUndefined,
  setProperty,
};
