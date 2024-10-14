// import { defineAction } from 'astro:actions';
// import { db, DecoImage } from 'astro:db';
// import { z } from 'astro:schema';

export default {
  // saveDecoImage: defineAction({
  //   input: z.object({
  //     url: z.string(),
  //     title: z.string().optional(),
  //     name: z.string().optional(),
  //   }),
  //   async handler(input) {
  //     const [entity] = await db
  //       .insert(DecoImage)
  //       .values(input)
  //       .returning({ id: DecoImage.id });
  //     return entity;
  //   },
  // }),
};
