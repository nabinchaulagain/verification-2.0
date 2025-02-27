import { ZodSchema } from 'zod';

export function getFieldErrors<T>(
  schema: ZodSchema<T>,
  data: T
): Record<string, string> {
  const result = schema.safeParse(data);

  if (result.success) return {};

  const fieldErrors = result.error.flatten().fieldErrors;

  return Object.keys(fieldErrors).length > 0
    ? Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
          key,
          Array.isArray(messages) && messages.length > 0
            ? messages[0]
            : 'Invalid value',
        ])
      )
    : {};
}
