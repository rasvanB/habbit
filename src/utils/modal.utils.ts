import { Habit } from "../context/user.context";

export const validateModal = (habit: Habit) => {
  if (!habit.name) return "Please enter a name";
  if (!habit.iconName) return "Please select the icon";
  if (!habit.unit) return "Please enter the unit";
};
