let tasks = [
    {description: "Write report", completed: false, priority:2},
    {description: "Send email", completed: true, priority:3},
    {description: "Prepare presentation", completed: false, priority:1},
];

let pendingSortedTasks = tasks.filter((e) => !e.completed).sort((a,b) => a.priority - b.priority);
/*The sort function compares two items a and b and arranges them based on the result:

If result < 0 → a comes before b

If result > 0 → b comes before a

If result = 0 → order remains the same
*/
console.log(pendingSortedTasks);