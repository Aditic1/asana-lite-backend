export const logger = {
  error: (message: string | Error): void => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(message);
    }
  },
  info: (message: string | Error): void => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(message);
    }
  },
};
