import { HabitType } from "../context/habit.context";
export const validateModal = (habit: HabitType) => {
  if (!habit.name) return "Please enter a name";
  if (!habit.iconName) return "Please select the icon";
  if (!habit.unit) return "Please enter the unit";
};
