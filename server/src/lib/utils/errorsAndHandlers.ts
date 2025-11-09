import z, { ZodError } from "zod";

export const withHandled = <T extends (...args: any[]) => any | Promise<any>>(
  fn: T
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...args);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };
};

export const errorHandler = (error: unknown) => {
  if (error instanceof ZodError) {
    console.error(z.prettifyError(error));
  } else if (error instanceof Error) {
    console.error(`❌ ${error.name}: ${error.message}\n${error.stack}`);
  } else {
    console.error("❌ Unknown error:", error);
  }
};

export const errorSchema = z.object({ error: z.string() });
