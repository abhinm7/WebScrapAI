const { pgTable, text, timestamp } = require('drizzle-orm/pg-core');

const tasks = pgTable('tasks', {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
    question: text('question').notNull(),
    status: text('status').notNull().default('queued'),
    answer: text('answer'),
    createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { tasks };