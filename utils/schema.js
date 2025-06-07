import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
  jobDes: varchar('jobDes', { length: 1000 }).notNull(),
  jobExperience: varchar('jobExperience', { length: 100 }).notNull(),
  createdBy: varchar('createBy', { length: 255 }).notNull(),
  createAt: varchar('createdAt', { length: 100 }),
  mockId: varchar('mockId', { length: 255 }).notNull()
});

export const UserAnswer = pgTable('userAnswer',{
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockIdRef', { length: 255 }).notNull(),
  question: varchar('question', {length: 255}).notNull(),
  correctAnswer: text('correctAnswer'),
  userAnswer: text('userAnswer'),
  feedback: text('feedback'),
  rating: varchar('rating', {length: 10}),
  userEmail: varchar('userEmail', {length:255}),
  createAt: varchar('createdAt', {length: 255}),
});
