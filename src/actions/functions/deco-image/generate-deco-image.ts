import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { openai } from '@/pages/_utils/openai';

export default {
  generateDecoImage: defineAction({
    input: z.object({
      inner: z.instanceof(Blob),
      outer: z.instanceof(Blob),
    }),

    async handler({ inner, outer }) {
      try {
        console.log(inner, outer);

        const image = await openai.images.generate({
          prompt:
            'A vertical purikura frame with an open space in the center for inserting an image. There is a large, blank rectangular area in the center where an image can be placed. The frame features a grand and ornate design, adorned with a crown at the top, pink roses, and intricate transparent and pink decorations resembling wings and hearts. The frame has a luxurious and dreamy beauty, with sparkling elements that evoke a magical or fantasy-like atmosphere.',
          model: 'dall-e-2',
          n: 1,
          size: '256x256',
        });

        return {
          url: image.data[0].url,
        };

        // ↓ エラーが発生するためコメントアウト
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  }),
};
