import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  hello: defineAction({
    input: z.object({
      name: z.string(),
    }),
    async handler({ name }) {
      return {
        message: `Hello, ${name}!`,
      };
    },
  }),
};
