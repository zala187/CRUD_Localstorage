  let editIndex = null; // ✅ ADD ONLY THIS (top of file)

function addClient() {
  const clientData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    condition: document.getElementById("condition").value,
    caregiver: document.getElementById("caregiver").value,
    contact: document.getElementById("contact").value,
  };

  const clients = JSON.parse(localStorage.getItem("clients")) || [];

  if (editIndex !== null) {
    // ✅ UPDATE (same record)
    clients[editIndex] = {
      ...clients[editIndex], // isCheckedIn safe rahega
      ...clientData
    };
    editIndex = null;
  } else {
    // ✅ ADD (new record)
    clientData.isCheckedIn = false;
    clients.push(clientData);
  }

  localStorage.setItem("clients", JSON.stringify(clients));
  document.getElementById("clientForm").reset();
  renderClients();
}

  function renderClients(){
    const tableBody = document.getElementById("clientTableBody");
    tableBody.innerHTML = " ";
    const clients = JSON.parse(localStorage.getItem("clients"));
    clients.map((client,index)=>{
      const row = document.createElement("tr");
     row.innerHTML = `
  <td class="px-4 py-2 border">${client.name}</td>
  <td class="px-4 py-2 border text-center">${client.age}</td>
  <td class="px-4 py-2 border">${client.condition}</td>
  <td class="px-4 py-2 border">${client.caregiver}</td>
  <td class="px-4 py-2 border">${client.contact}</td>

 <td class="text-center">
  <div class="inline-flex gap-2">

    <!-- LEFT : CHECK IN -->
    <button
      onclick="setVisitStatus(${index}, true)"
      class="p-2 rounded-lg transition
      ${client.isCheckedIn
        ? 'bg-green-500 text-white shadow'
        : 'bg-gray-100 text-gray-500'}">
      <i class="fa-solid fa-user-check"></i>
    </button>

    <!-- RIGHT : CHECK OUT -->
    <button
      onclick="setVisitStatus(${index}, false)"
      class="p-2 rounded-lg transition
      ${!client.isCheckedIn
        ? 'bg-gray-700 text-white shadow'
        : 'bg-gray-100 text-gray-500'}">
      <i class="fa-solid fa-user-xmark"></i>
    </button>

  </div>
</td>



  <!-- Delete -->
  <td class="px-4 py-2 border text-center">
    <button
    onclick="editClient(${index})"
    class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
   <div class="icon-square-pen"></div>
  </button>
    <button 
      onclick="deleteClient(${index})"
      class="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition">
     <div class="icon-trash-2"></div>
     
    </button>
  </td>
`;

        tableBody.appendChild(row);
    });
    updateCheckedInCount(); // ✅ REQUIRED
  }
  window.addEventListener("load",renderClients)

  document.getElementById("clientForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    addClient();
  })

 function toggleCheckIn(index) {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];
  clients[index].isCheckedIn = !clients[index].isCheckedIn;
  localStorage.setItem("clients", JSON.stringify(clients));
  renderClients();
}

function deleteClient(index) {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  clients.splice(index, 1);
  localStorage.setItem("clients", JSON.stringify(clients));
  renderClients();
}

function updateCheckedInCount() {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];
  document.getElementById("checkedInCount").textContent =
    clients.filter(c => c.isCheckedIn).length;
}

function setVisitStatus(index, status) {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];
  clients[index].isCheckedIn = status;
  localStorage.setItem("clients", JSON.stringify(clients));
  renderClients();
  updateCheckedInCount();
}




function editClient(index) {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];

  // 1️⃣ Selected client
  const client = clients[index];

  // 2️⃣ Form me values set
  name.value = client.name;
  age.value = client.age;
  condition.value = client.condition;
  caregiver.value = client.caregiver;
  contact.value = client.contact;

  // 3️⃣ Remember index
  editIndex = index;

  // 4️⃣ Button text change
  document.getElementById("submitBtn").textContent = "Update Client";
}
