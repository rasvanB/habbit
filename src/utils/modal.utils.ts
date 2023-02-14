import { Habit } from "./types.utils";

export const validateModal = (habit: Habit) => {
  if (!habit.habitName) return "Please enter a name";
  if (habit.habitName.length > 150)
    return "Name is too long (max. 150 characters)";
  if (!habit.iconName) return "Please select the icon";
  if (!habit.unit) return "Please enter the unit";
  if (habit.unit.length > 15) return "Unit is too long (max. 15 characters)";
};
