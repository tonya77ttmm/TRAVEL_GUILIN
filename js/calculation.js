"user strict";
// get all the budget table, get the row
//get all the price-item
//get all the numberofpeople
//get all the total-item

function calculateBudgetTablePrices() {
  const tables = document.querySelectorAll(".budget-table");
  const totalPrices = document.querySelectorAll(".total-price");
  for (let i = 0; i < tables.length; i++) {
    const rows = tables[i].querySelectorAll("tr");
    let totalPrice = 0;
    rows.forEach((row) => {
      const priceItem = row.querySelector(".price-item");
      const numberOfPeople = row.querySelector(".number-of-people");
      const totalItem = row.querySelector(".total-item");
      if (priceItem && numberOfPeople && totalItem) {
        const temp =
          parseFloat(priceItem.textContent) *
          parseFloat(numberOfPeople.textContent);
        totalItem.textContent = temp;
        totalPrice += temp;
      }
    });
    totalPrices[i].textContent = totalPrice;
  }
}
calculateBudgetTablePrices();

function calculateGuilinPrices() {
  const totalPrices = document.querySelectorAll(".total-price");
  let sum = 0;
  totalPrices.forEach((totalPrice) => {
    const priceItem = Number(totalPrice.textContent);
    sum += priceItem;
  });
  document.querySelector(".guilin-price").textContent = sum;
}
calculateGuilinPrices();
