export const INFINITE = 100;

export const retryAsync = async <Type = any>(operation: () => Promise<Type>, retries: number, interval: number, maxInterval: number, retryOperation?: () => Promise<any>): Promise<Type> => {
  try {
    return await operation();
  } catch (err) {
    if (retries === 1) throw err;

    await new Promise<undefined>((resolve) => setTimeout(resolve, interval));
    await retryOperation?.();

    const delay: number = Math.min(interval * 2, maxInterval); // back off delay
    return retryAsync(operation, retries - 1, delay, maxInterval, retryOperation);
  }
};
