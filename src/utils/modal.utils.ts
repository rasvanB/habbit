import { Habit } from "../context/user.context";

export const validateModal = (habit: Habit) => {
  if (!habit.name) return "Please enter a name";
  if (habit.name.length > 150) return "Name is too long (max. 150 characters)";
  if (!habit.iconName) return "Please select the icon";
  if (!habit.unit) return "Please enter the unit";
  if (habit.unit.length > 100) return "Unit is too log (max. 100 characters)";
};
