import { column, defineDb, defineTable } from 'astro:db';

export default defineDb({
  tables: {
    DecoImage: defineTable({
      columns: {
        id: column.text({ primaryKey: true }),
        url: column.text(),
        title: column.text({ optional: true }),
        author: column.text({ optional: true }),
      },
    }),
  },
});
