export function sortByPriorityAndDate(arr) {
  const priorityRank = { High: 3, Medium: 2, Low: 1 };

  return arr.sort((a, b) => {
    // sort by priority first
    if (a.status === "Completed") {
      return 1;
    }
    if (priorityRank[a.priority] > priorityRank[b.priority]) {
      return -1;
    }
    if (priorityRank[a.priority] < priorityRank[b.priority]) {
      return 1;
    }
    // if priority is the same, then sort by date
    const dateA = Date.parse(a.due_date);
    const dateB = Date.parse(b.due_date);
    return dateB - dateA;
  });
}

export const getAllTodos_convToArr = async () => {
  const response = await fetch(
    "https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist.json",
    {
      next: { revalidate: 0 },
    }
  );
  const data = await response.json();

  let allTodos = [];
  for (const key in data) {
    const obj = data[key];
    obj.id = key;

    allTodos.push(obj);
  }

  const sortedTodos = sortByPriorityAndDate(allTodos);

  return sortedTodos;
};
