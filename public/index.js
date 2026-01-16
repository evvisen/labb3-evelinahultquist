document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  loadStats();
  loadGoals();
});

//Hämta alla transaktioner

async function loadTransactions() {
  try {
    const response = await fetch("/transactions");
    const transactions = await response.json();

    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach((transaction) => {
      const row = `
      <tr>
         <td>${new Date(transaction.transactionDate).toLocaleDateString(
           "sv-SE"
         )}</td>
         <td>${transaction.transactionCompanyName}</td>
         <td>${transaction.categoryName}</td>
        <td>${transaction.transactionAmount} kr</td>
      </tr>
      `;
      list.innerHTML += row;
    });
  } catch (err) {
    console.error("Kunde inte ladda transaktioner: ", err);
  }
}

//Hämta statistik
async function loadStats() {
  try {
    const response = await fetch("/transactions/stats/by-category");
    const stats = await response.json();

    const container = document.getElementById("stats-container");
    container.innerHTML = "";

    stats.forEach((s) => {
      container.innerHTML += `
              <div class="stat-card">
                  <strong>${s.categoryName}:</strong> ${s.totalAmount} kr
              </div>
          `;
    });
  } catch (err) {
    console.error("Kunde inte ladda statistik:", err);
  }
}

//Sök efter specifik transaktion
async function searchTransactions() {
  const query = document.getElementById("searchInput").value;
  try {
    const response = await fetch(`/transactions/search?q=${query}`);
    const transactions = await response.json();
    renderTable(transactions);
  } catch (err) {
    console.error("Sökningen misslyckades:", err);
  }
}

function renderTable(transactions) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = transactions
    .map(
      (t) => `
      <tr>
          <td>${new Date(t.transactionDate).toLocaleDateString("sv-SE")}</td>
          <td>${t.transactionCompanyName}</td>
          <td>${t.categoryName}</td>
          <td>${t.transactionAmount} kr</td>
      </tr>
  `
    )
    .join("");
}

//hämta sparmål
async function loadGoals() {
  try {
    const response = await fetch("/savingGoal");
    const goals = await response.json();
    const container = document.getElementById("goals-container");
    container.innerHTML = "";

    goals.forEach((g) => {
      container.innerHTML += `
              <div class="goal-card">
                  <strong>${g.name}:</strong> ${g.goalAmount} kr
              </div>
          `;
    });
  } catch (err) {
    console.error("Kunde inte ladda mål:", err);
  }
}
