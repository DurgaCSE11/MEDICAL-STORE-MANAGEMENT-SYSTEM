let medicines = [];

function addOrUpdateMedicine() {
  const id = document.getElementById("medId").value;
  const name = document.getElementById("medName").value;
  const qty = document.getElementById("medQty").value;
  const price = document.getElementById("medPrice").value;

  if (!id || !name || !qty || !price) {
    alert("Please fill all fields!");
    return;
  }

  const existing = medicines.find(med => med.id == id);
  if (existing) {
    existing.name = name;
    existing.qty = qty;
    existing.price = price;
    alert("Medicine updated!");
  } else {
    medicines.push({ id, name, qty, price });
    alert("Medicine added!");
  }

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
  const searchId = document.getElementById("searchId").value;
  const result = medicines.find(med => med.id == searchId);
  const output = document.getElementById("searchResult");

  if (result) {
    output.innerText = `Found: ID=${result.id}, Name=${result.name}, Qty=${result.qty}, Price=${result.price}`;
  } else {
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
    displayMedicines();
  }
}

function clearInputs() {
  document.getElementById("medId").value = "";
  document.getElementById("medName").value = "";
  document.getElementById("medQty").value = "";
  document.getElementById("medPrice").value = "";
}
