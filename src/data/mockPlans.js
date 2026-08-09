export const mockDietPlan = {
  goal: "Weight Loss",
  calories: 1850,
  macros: { protein: "140g", carbs: "180g", fats: "55g" },
  meals: [
    { name: "Breakfast", items: "Oats, banana, peanut butter", calories: 420 },
    { name: "Lunch", items: "Grilled chicken, brown rice, veggies", calories: 550 },
    { name: "Snack", items: "Greek yogurt, almonds", calories: 250 },
    { name: "Dinner", items: "Salmon, quinoa, salad", calories: 630 },
  ],
};

export const mockWorkoutPlan = {
  split: "Push / Pull / Legs",
  days: [
    { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)", exercises: ["Bench Press 4x8", "Shoulder Press 3x10", "Tricep Dips 3x12"] },
    { day: "Tuesday", focus: "Pull (Back, Biceps)", exercises: ["Pull Ups 4x8", "Barbell Rows 4x10", "Bicep Curls 3x12"] },
    { day: "Wednesday", focus: "Legs", exercises: ["Squats 4x8", "Lunges 3x12", "Calf Raises 3x15"] },
    { day: "Thursday", focus: "Rest / Active Recovery", exercises: ["20 min walk", "Stretching"] },
  ],
};