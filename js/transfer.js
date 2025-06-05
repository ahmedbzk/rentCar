$(document).ready(function () {
  $(document).on('click', '.section-header', function () {
    const target = $(this).data('bs-target');
    $(target).slideToggle();
    $(this).text(function (i, text) {
      return text.startsWith("▲") ? text.replace("▲", "▼") : text.replace("▼", "▲");
    });
  });

  window.showSelected = function () {
    const selected = [];
    $('input[type="checkbox"]:checked').each(function () {
      selected.push($(this).val());
    });

    const list = $('#selectedList');
    list.empty();
    if (selected.length === 0) {
      list.append('<li><em>Hiçbir filtre seçilmedi.</em></li>');
    } else {
      selected.forEach(item => {
        list.append('<li>' + item + '</li>');
      });
    }
  };
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. JSON verisini çek
  fetch("../cars.json")
    .then(res => res.json())
    .then(data => {
      if(data){
        setTimeout(() => {
          document.querySelector("#loader").style.display = "none";
          renderCars(data);           
          window_carList = data;     

        
        }, 1000);}
          const sortSelect = document.getElementById("sortSelect"); 
      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          sortAndRenderCars(e.target.value);
        });
      } 
    })
    .catch(err => console.error("cars.json not found:", err));
});

// 3. Arabaları sıralayıp tekrar listele
function sortAndRenderCars(order) {
  const sorted = [...window_carList].sort((a, b) => {
    const priceA = a.totalPrice || a.dailyPrice || 0;
    const priceB = b.totalPrice || b.dailyPrice || 0;
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
  renderCars(sorted);
}
// Sıralama fonksiyonu
function sortAndRenderCars(order) {
  if(order){
    document.getElementById("carList").innerHTML = "";
    document.querySelector("#loader").style.display = "block";
    setTimeout(() => {
        const sorted = [...window_carList].sort((a, b) => {
        const priceA = a.totalPrice || a.dailyPrice || 0;
        const priceB = b.totalPrice || b.dailyPrice || 0;
        return order === "asc" ? priceA - priceB : priceB - priceA;
      });
      renderCars(sorted);
      document.querySelector("#loader").style.display = "none";
    }, 1000);
  }

}

document.getElementById("sortSelect").addEventListener("change", (e) => {
  const step1 = document.getElementById("stepOneVehicle");
  const step2 = document.getElementById("stepTwoDetails");
  const step3 = document.getElementById("stepThreeTransfer");

  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";

  const order = e.target.value;
  sortAndRenderCars(order);
});

// modal detail cars
function showDetails(index) {
  const car = window._carList[index];
  const body = document.getElementById("carModalBody");

  body.innerHTML = `
    <strong>Vehicle details:</strong><br>
    <ul>
      <li>${car.model}</li>
      <li>Up to ${car.seats} Passengers</li>
      <li>${car.bags} Large Bags, ${car.smallBags} Small Bags</li>
      <li>Fuel: ${car.fuel}</li>
      <li>Gear: ${car.gear}</li>
    </ul>

    <strong>Requirements:</strong>
    <ul>
      <li>Minimum Driver Age: ${car.minDriverAge}</li>
      <li>Minimum License Years: ${car.minLicenseYears}</li>
    </ul>

    <strong>Included:</strong>
    <ul>${car.features.map(f => `<li>${f}</li>`).join("")}</ul>

    <strong class="text-success">Total Price:</strong> $${car.totalPrice.toFixed(2)}
  `;

  const modal = new bootstrap.Modal(document.getElementById("carModal"));
  modal.show();
}

function renderCars(cars) {
  renderTransferSummary();

  const list = document.getElementById("carList");
  list.innerHTML = "";

  cars.forEach((car, i) => {
    const card = document.createElement("div");
    card.className = "col-md-12 mb-3 ";
    card.innerHTML = `
    <div class="btn" onclick="selectCar(${i}, this)" style="padding:0px">
      <div class="card shadow-sm p-3">
        <div class="card-body d-flex align-items-center">
          <img src="../images/carPhoto.png" class="me-3" alt="Car" style="width:25%">
          <div class="flex-grow-1" style="margin-left:30px">
            <h5 style="text-align:start">${car.model}</h5>
            <p style="text-align:start">
              <i class="bi bi-gear-fill"></i> ${car.gear} &nbsp;
              <i class="bi bi-fuel-pump"></i> ${car.fuel} &nbsp;
              <i class="bi bi-people-fill"></i> ${car.seats} Seats &nbsp;
              <i class="bi bi-suitcase"></i> ${car.bags} Bags
            </p>
            <p class="text-muted" style="text-align:start">${car.features.join(", ")}</p>
            <button class="btn btn-sm btn-outline-info d-flex" onclick="showDetails(${i})">
              <i class="bi bi-question-circle" style="margin-right:10px"></i> Details
            </button>
          </div>
          <div class="text-end">
            <div class="text-muted">Daily</div>
            <div class="h6 text-success justify-content-end">$${car.dailyPrice.toFixed(2)}</div>
            <div class="text-muted mt-5">Total Price</div>
            <div class="h5 text-success">$${car.totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
      </div>

    `;
    list.appendChild(card);
  });

  // Store cars globally
  window._carList = cars;
}

let selectedButton = null;      
let selectedIndex = null;
function selectCar(index, button) {
  // Aynı butona 2. kez tıklanırsa → seçimi kaldır
  if (selectedButton === button) {
    button.classList.remove("btn-dark");

    selectedButton = null;
    selectedIndex = null;

    return;
  }

  // Farklı bir butona tıklanmışsa → önceki seçimi kaldır
  if (selectedButton) {
    selectedButton.classList.remove("btn-dark");
  }

  // Yeni seçimi uygula
  button.classList.add("btn-dark");

  selectedButton = button;
  selectedIndex = index;

}

function logSelectedCar() {
  if (selectedIndex !== null) {
    const selectedCar = window._carList[selectedIndex];
    console.log("Confirmed selected car:", selectedCar);
    carDetailSection(selectedCar);
  } else {
    showAlert("No car selected yet.", "warning");
  }
}
function carDetailSection(carData) {
  const container = document.getElementById('carListDetail');

  const card = document.createElement('div');
  card.className = 'd-flex justify-content-between align-items-center p-4 shadow mb-3 w-100';
  card.style.maxWidth = '400px';
  card.style.backgroundColor='#F9F9F9'

  card.innerHTML = `
    <div class="d-flex align-items-center">
      <img src="../images/carPhoto.png" style="width: 80px; height: auto;" class="me-3">
      <div>
        <h6 class="mb-1">${carData.model}</h6>
        <div class="text-muted small">
          <i class="bi bi-people-fill me-1"></i>${carData.seats}
          <i class="bi bi-suitcase-fill ms-3 me-1"></i>${carData.bags}
        </div>
      </div>
    </div>
    <div class="fs-5 fw-semibold text-end">
      € ${carData.totalPrice}
    </div>
  `;

  container.appendChild(card);

}

function clearCarDetail() {
  const existingCard = document.getElementById('carListDetail');
  if (existingCard) {
    existingCard.innerHTML = ''; 
  }
}

let progressStep = 1;

function goForward(){
  if(progressStep===1){
    if(selectedIndex !== null){
      progressStep+=1;
      advanceProgress()
    }
  }
  else if(progressStep===2){

      const flightInput = document.querySelector("input[placeholder='e.g. LH1868']");
      if (!flightInput || flightInput.value.trim() === "") {
          showAlert("Please Fill the 'Flight/train number'.", "warning");
      }else{
        progressStep += 1;
        advanceProgress();
        // step3
        renderPassengerForms()

      }
  }
  else if (progressStep>3){
    progressStep=1;
  }
      
}

function advanceProgress() { 

  const stepLeft = document.getElementById("stepLeft");
  const stepRight = document.getElementById("stepRight");

  if (selectedIndex !== null) {

    document.querySelector("#stepOneVehicle").style.display = "none";
    document.querySelector("#stepTwoDetails").style.display = "none";
    document.querySelector("#stepThreeTransfer").style.display = "none";
    document.querySelector("#filterCars").style.display = "none";

    const steps = document.querySelectorAll(".step");
    const lines = document.querySelectorAll(".line");

    steps.forEach(step => step.querySelector(".circle").classList.remove("active"));
    lines.forEach(line => line.classList.remove("completed"));

   
    for (let i = 0; i < progressStep; i++) {
      steps[i].querySelector(".circle").classList.add("active");
      if (i < progressStep - 1) {
        lines[i].classList.add("completed");
      }
    }

   
    if (progressStep === 1) {
      document.querySelector("#stepOneVehicle").style.display = "flex";
    document.querySelector("#stepTwoDetails").style.display = "none";
    document.querySelector("#stepThreeTransfer").style.display = "none";
    document.querySelector("#filterCars").style.display = "flex";

      stepLeft.innerHTML = `
        <i class="bi bi-car-front-fill me-2" style="font-size: x-large;"></i>
        <strong class="me-2" style="font-size: large;">Your Choice:</strong>
        <span id="selectedCar" style="font-size: large;">Economy</span>
      `;
      stepRight.innerHTML = `
        <button class="btn" id="continueBtn"
          style="color: white; width: 100%; padding: 15px;
                background: linear-gradient(to right, black, #434343);
                border-right: 0px; font-size: large;"
          onclick="logSelectedCar(); goForward();">
          Continue
        </button>
      `;
    }

    else if (progressStep === 2) {
      document.querySelector("#stepOneVehicle").style.display = "none";
    document.querySelector("#stepTwoDetails").style.display = "flex";
    document.querySelector("#stepThreeTransfer").style.display = "none";
    document.querySelector("#filterCars").style.display = "none";

      stepLeft.innerHTML = `
        <button class="btn btn-outline-secondary" onclick="goBack(); clearCarDetail();">
          <i class="bi bi-arrow-left-circle me-1"></i> Go Back
        </button>
      `;
      stepRight.innerHTML = `
        <button class="btn" id="continueBtn"
          style="color: white; width: 100%; padding: 15px;
                background: linear-gradient(to right, black, #434343);
                border-right: 0px; font-size: large;"
          onclick=" goForward();">
          Continue
        </button>
      `;
    }

    else if (progressStep === 3) {

    document.querySelector("#stepOneVehicle").style.display = "none";
    document.querySelector("#stepTwoDetails").style.display = "none";
    document.querySelector("#stepThreeTransfer").style.display = "flex";
    document.querySelector("#filterCars").style.display = "none";

      stepLeft.innerHTML = `
        <button class="btn btn-outline-secondary" onclick="goBack()">
          <i class="bi bi-arrow-left-circle me-1"></i> Go Back
        </button>
      `;
      stepRight.innerHTML = `
        <button class="btn btn-dark" id="customContinueBtn" style="width: 100%; padding: 15px; font-size: large; display:block">
          TRANSFER
        </button>
      `;
    }

    else if (progressStep > 3) {
      progressStep = 1;
    }
  }
}


function goBack(){
  if(progressStep > 1){
    progressStep -= 1;
    advanceProgress()
  }else if(progressStep==1){
    progressStep=1;
  }
}

// step3
function renderPassengerForms() {
 const container = document.getElementById("passengerForms");
  const transfer = JSON.parse(localStorage.getItem("transfer") || "{}");
  const passengerCount = parseInt(transfer.passengers || "1", 10);

  container.innerHTML = "";

  for (let i = 1; i <= passengerCount; i++) {
    const isLead = i === 1;
    const title = isLead ? "Lead passenger" : `Passenger ${i}`;
    const index = i;

    const formBlock = document.createElement("div");
    formBlock.className = "card p-4 shadow-sm border mb-4";

    formBlock.innerHTML = `
      <h5 class="mb-3 fw-semibold">${title}</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">First name <span class="text-danger">*</span></label>
          <input type="text" name="firstName${index}" class="form-control bg-light" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Last name <span class="text-danger">*</span></label>
          <input type="text" name="lastName${index}" class="form-control bg-light" required>
        </div>

        ${isLead ? `
        <div class="col-md-6">
          <label class="form-label">Email <span class="text-danger">*</span></label>
          <input type="email" name="email${index}" class="form-control bg-light" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Mobile <span class="text-danger">*</span></label>
          <input type="tel" name="mobile${index}" class="form-control bg-light" required>
        </div>
        ` : ''}

        <div class="col-md-6">
          <label class="form-label">T.C. Kimlik <span class="text-danger">*</span></label>
          <input type="text" name="tcKimlik${index}" class="form-control bg-light"
            pattern="^[1-9]{1}[0-9]{9}[02468]{1}$" required>
        </div>
      </div>
    `;

    container.appendChild(formBlock);
  }

  // 🔘 Devam Et butonuna tıklanınca form verilerini topla
  document.getElementById("customContinueBtn").addEventListener("click", () => {
  const allInputs = document.querySelectorAll('#passengerForms input');
  let isValid = true;

  // HTML5 doğrulamasını manuel tetikle
  allInputs.forEach(input => {
    if (!input.checkValidity()) {
      input.classList.add("is-invalid");
      isValid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!isValid) {
    showAlert("Please fill all the required fields correctly'.", "danger");
    return;
  }

  // Yolcu bilgilerini topla
  const transfer = JSON.parse(localStorage.getItem("transfer") || "{}");
  const passengerCount = parseInt(transfer.passengers || "1", 10);
  const passengerData = [];

  for (let i = 1; i <= passengerCount; i++) {
    const data = {
      firstName: document.querySelector(`[name="firstName${i}"]`).value,
      lastName: document.querySelector(`[name="lastName${i}"]`).value,
      tcKimlik: document.querySelector(`[name="tcKimlik${i}"]`).value
    };

    // Sadece lead passenger (i === 1) için email ve mobile al
    if (i === 1) {
      data.email = document.querySelector(`[name="email${i}"]`).value;
      data.mobile = document.querySelector(`[name="mobile${i}"]`).value;
    }

    passengerData.push(data);
  }
 
  });
}

function renderTransferSummary() {
  const transfer = JSON.parse(localStorage.getItem("transfer") || "{}");
  document.getElementById("from").textContent = transfer.from || "";
  document.getElementById("to").textContent = transfer.to || "";
  document.getElementById("pickupDate").textContent = transfer.pickupDate || "";
  document.getElementById("pickupTime").textContent = transfer.pickupTime || "";
  document.getElementById("passengers").textContent = `${transfer.passengers || 1} Passenger${transfer.passengers > 1 ? 's' : ''}`;
}


function saveUpdatedTransfer() {
  const from = document.getElementById("fromInput").value.trim();
  const to = document.getElementById("toInput").value.trim();
  const pickupDate = document.getElementById("pickupDateInput").value;
  const pickupTime = document.getElementById("pickupTimeInput").value;
  const passengers = parseInt(document.getElementById("passengersInput").value);

  // 🛑 Validation kontrolü
  if (!from || !to || !pickupDate || !pickupTime || isNaN(passengers)) {
    showAlert("Please fill all the inputs.", "danger");
    return;
  }

  if (passengers < 1 || passengers > 5) {
    showAlert("Passengers count can be max 5.", "warning");
    return;
  }

  const updated = {
    from,
    to,
    pickupDate,
    pickupTime,
    passengers
  };

  localStorage.setItem("transfer", JSON.stringify(updated));
  const modal = bootstrap.Modal.getInstance(document.getElementById("editTransferModal"));
  modal.hide();

  showAlert("Loading...", "success");

  setTimeout(() => {
    window.location.href = "../pages/transfer.html";
  }, 1000);

  renderTransferSummary();
}

function prepareModalData(){
  const editModal = document.getElementById('editTransferModal');
  const newHandler = () => {
    const transfer = JSON.parse(localStorage.getItem("transfer") || "{}");

    document.getElementById("fromInput").value = transfer.from || "";
    document.getElementById("toInput").value = transfer.to || "";
    document.getElementById("pickupDateInput").value = transfer.pickupDate || "";
    document.getElementById("pickupTimeInput").value = transfer.pickupTime || "";
    document.getElementById("passengersInput").value = transfer.passengers || 1;
  };

  editModal.removeEventListener('shown.bs.modal', newHandler);
  editModal.addEventListener('shown.bs.modal', newHandler);
}