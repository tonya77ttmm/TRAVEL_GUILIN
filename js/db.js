"user strict";
// local database
var tableIds = [];
let debounceTimer;

function saveTable(tableId) {
  var table = document.getElementById(tableId);
  if (!table) {
    console.error("Table with ID '" + tableId + "' not found.");
    return;
  }

  // Get the entire HTML including the <table> tag
  const tableData = encodeURIComponent(table.outerHTML);

  console.log("Saving data:", tableData); // Debugging line

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/save_table", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "tableId=" + encodeURIComponent(tableId) + "&tableData=" + tableData
  );
}

function debounce(func, wait) {
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), wait);
  };
}

function loadTable() {
  const tableId = "budget-table-1"; // Replace with actual table ID
  fetch(
    `http://localhost:5000/load_table?tableId=${encodeURIComponent(tableId)}`
  )
    .then((response) => response.text())
    .then((data) => {
      console.log("Data loaded:", data); // Log data for debugging
      const tableElement = document.getElementById(tableId);
      if (tableElement) {
        tableElement.outerHTML = data; // Replace the table HTML content
      } else {
        console.error("Table with ID " + tableId + " not found.");
      }
    })
    .catch((error) => console.error("Error loading data:", error));
}

// function loadTable() {
//     const tableId = 'budget-table-1'; // Replace with actual table ID
//     console.log('11111111');
//     fetch(`http://localhost:5000/load_table?tableId=${tableId}`)
//     .then(response => response.text())
//     .then(data => {
//         console.log('Data loaded:', data);  // Log data for debugging
//         document.querySelector('.budget-table').outerHTML = data;
//     })
//     .catch((error) => console.error('Error loading data:', error));
// }

// Call loadTable() when the page loads
window.onload = loadTable;

// // Save table data with debounce
// document.querySelector(".budget-table").addEventListener(
//   "input",
//   debounce(function () {
//     console.log("1111有了！");
//     if (!tableIds.includes(table.id)) {
//       tableIds.push(table.id);
//     } else {
//       console.log("有了！");
//     }
//     saveTable(table.id);
//   }, 1000),
//   true
// ); // Debounce time in milliseconds

// Save table data with debounce
document.querySelectorAll(".budget-table").forEach(function (table) {
  table.addEventListener(
    "input",
    debounce(function () {
      saveTable(table.id);
    }, 1000)
  ); // Debounce time in milliseconds
});
