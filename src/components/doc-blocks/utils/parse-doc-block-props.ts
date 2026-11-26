import { z } from 'zod';

/**
 * Validate the props of a doc block and fail the build with a readable message.
 * @param block Component name used in the error (`Architecture`, `Flow`, ...).
 * @param schema Zod schema describing the props.
 * @param input Raw props received from MDX / Astro.
 * @throws Error naming the block and every invalid path.
 */
export function parseDocBlockProps<S extends z.ZodType>(
  block: string,
  schema: S,
  input: unknown
): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new Error(`<${block}> received invalid props:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
