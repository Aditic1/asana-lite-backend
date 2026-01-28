export const logger = {
  error: (message: unknown): void => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(message);
    }
  },
};
