// Load medicines from localStorage or initialize empty array
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// Display medicines on page load
displayMedicines();

function addOrUpdateMedicine() {
  const id = document.getElementById("medId").value.trim();
  const name = document.getElementById("medName").value.trim();
  const qty = document.getElementById("medQty").value.trim();
  const price = document.getElementById("medPrice").value.trim();
  const message = document.getElementById("message");

  if (!id || !name || !qty || !price) {
    message.style.color = "red";
    message.innerText = "Please fill all fields!";
    return;
  }

  const existing = medicines.find(med => med.id == id);
  if (existing) {
    existing.name = name;
    existing.qty = qty;
    existing.price = price;
    message.style.color = "green";
    message.innerText = "Medicine updated successfully!";
  } else {
    medicines.push({ id, name, qty, price });
    message.style.color = "green";
    message.innerText = "Medicine added successfully!";
  }

  // Save to localStorage
  localStorage.setItem("medicines", JSON.stringify(medicines));
  clearInputs();
  displayMedicines();
}

function displayMedicines() {
  const table = document.getElementById("medicineTable");
  table.innerHTML = "";
  medicines.forEach((med, index) => {
    table.innerHTML += `
      <tr>
        <td>${med.id}</td>
        <td>${med.name}</td>
        <td>${med.qty}</td>
        <td>${med.price}</td>
        <td class="actions">
          <button onclick="editMedicine(${index})">Edit</button>
          <button class="delete" onclick="deleteMedicine(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function searchMedicine() {
  const searchId = document.getElementById("searchId").value.trim();
  const output = document.getElementById("searchResult");
  const tableRows = document.querySelectorAll("#medicineTable tr");

  // Remove previous highlights
  tableRows.forEach(row => row.classList.remove("highlight"));

  const result = medicines.find(med => med.id == searchId);
  if (result) {
    output.style.color = "green";
    output.innerText = `Found: ID=${result.id}, Name=${result.name}, Qty=${result.qty}, Price=${result.price}`;

    // Highlight row
    tableRows.forEach(row => {
      if (row.cells[0].innerText == searchId) {
        row.classList.add("highlight");
      }
    });
  } else {
    output.style.color = "red";
    output.innerText = "Medicine not found!";
  }
}

function editMedicine(index) {
  const med = medicines[index];
  document.getElementById("medId").value = med.id;
  document.getElementById("medName").value = med.name;
  document.getElementById("medQty").value = med.qty;
  document.getElementById("medPrice").value = med.price;
}

function deleteMedicine(index) {
  if (confirm("Are you sure you want to delete this medicine?")) {
    medicines.splice(index, 1);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicines();
    document.getElementById("message").innerText = "Medicine deleted!";
  }
}

function clearAllMedicines() {
  if (confirm("Are you sure you want to clear all medicines?")) {
    medicines = [];
    localStorage.removeItem("medicines");
    displayMedicines();
    document.getElementById("message").innerText = "All medicines cleared!";
  }
}

function clearInputs() {
  document.getElementById("medId").value = "";
  document.getElementById("medName").value = "";
  document.getElementById("medQty").value = "";
  document.getElementById("medPrice").value = "";
  document.getElementById("message").innerText = "";
}
