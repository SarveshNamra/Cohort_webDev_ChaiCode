let expenses = [
    {description: "Groceries", amount: 50, category: "Food"},
    {description: "Electricity Bill", amount: 100, category: "Utilities"},
    {description: "Dinner", amount: 30, category: "Food"},
    {description: "Internet Bill", amount: 50, category: "Utilities"},
];

let expensesReport = expenses.reduce((accumulator,currentvalue) => {
    // accumulator[currentvalue.category] += currentvalue.amount;
    accumulator[currentvalue.category] = (accumulator[currentvalue.category] || 0) + currentvalue.amount;
    return accumulator;
},
{Food: 0, Utilities: 0}
);

console.log(expensesReport);