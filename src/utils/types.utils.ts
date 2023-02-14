import { z } from "zod";

export const DaySchema = z.object({
  date: z.string(),
  progress: z.number(),
  completed: z.boolean(),
});

export const HabitSchema = z.object({
  habitName: z.string(),
  iconName: z.string(),
  iconColor: z.string(),
  requirement: z.string(),
  description: z.string(),
  activeDays: z.array(DaySchema),
  goal: z.number(),
  unit: z.string(),
  timeStamp: z.number(),
});

export const UserSchema = z.object({
  displayName: z.string(),
  email: z.string().email(),
  photoURL: z.string(),
  uid: z.string(),
});

export type ActiveDay = z.infer<typeof DaySchema>;
export type Habit = z.infer<typeof HabitSchema>;
export type UserData = z.infer<typeof UserSchema>;
