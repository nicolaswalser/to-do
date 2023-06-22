const dateFormat = "mm/dd/yyyy";

let date = prompt("Enter the date 'mm/dd/yyyy' for your to-do.");
if (date.length != dateFormat.length) {
  alert("You did not enter a valid date.");
} else {
  let amount = parseInt(prompt("Enter the amount of events to-do."));
  let list = "";

  for (let i = 1; i <= amount; i++) {
    let toDo = prompt("Type your to-do activity");
    list += toDo + "\n";
  }

  alert("On " + date + ", you must:\n" + list);
}
