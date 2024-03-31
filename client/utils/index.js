export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

export const PRIOTITYSTYELS = {
  high: { color: '#FF0000' },
  medium: { color: '#FFFF00' },
  low: { color: '#0000FF' },
};

export const TASK_TYPE = {
  todo: { backgroundColor: '#0000FF' },
  "in progress": { backgroundColor: '#FFFF00' },
  completed: { backgroundColor: '#008000' },
};

export const BGS = [
  { backgroundColor: '#0000FF' },
  { backgroundColor: '#FFFF00' },
  { backgroundColor: '#FF0000' },
  { backgroundColor: '#008000' },
];
