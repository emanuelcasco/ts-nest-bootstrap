/*
 * Guard to verify if variable is an object.
 */
export const isObject = (variable: unknown): boolean => variable instanceof Object;

/*
 * Deep immutable copy of source object into tarjet object and returns a new object.
 */
export const deepMerge = <T>(target: T, source: DeepPartial<T>): T => {
  if (isObject(target) && isObject(source)) {
    return Object.keys(source).reduce(
      (output: T, key: string) => ({
        ...output,
        [key]: isObject(source[key]) && key in target ? deepMerge(target[key], source[key]) : source[key]
      }),
      { ...target }
    );
  }
  return target;
};

/**
 * DeepPartial Interface converts all object property to optional
 * Contrary to Partial<T> this implementation works with deep properties
 */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
