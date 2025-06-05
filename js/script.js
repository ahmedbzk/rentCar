document.addEventListener("DOMContentLoaded", () => {
   
  
  const loadPart = (file, elementId, callback) => {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id '${elementId}' not found.`);
        return;
      }

      element.innerHTML = data;

      if (callback) callback();
    })
    .catch(err => console.error(`Hata: ${file} yüklenemedi`, err));
};

  const currentPath = window.location.pathname;
  const isRoot = currentPath.endsWith("/index.html");
  const prefix = isRoot ? 'pages/' : '../pages/';

  loadPart(`${prefix}header.html`, 'header', loginAuth);
  loadPart(`${prefix}footer.html`, 'footer');

  const filename = currentPath.split("/").pop();
  const pageName = filename.replace(".html", "");

  if (pageName !== "index") {
    loadPart(`${prefix}${pageName}.html`, 'main');
  } else {
    loadPart(`${prefix}homePage.html`, 'main');
  }
});


// HOMEPAGE
function adjustPassengers(amount, type = 'transfer') {
  const id = type === 'hour' ? 'passengersHour' : 'passengersTransfer';
  const input = document.getElementById(id);
  let value = parseInt(input.value);
  value = Math.max(1, Math.min(5, value + amount));
  input.value = value;
}

function toggleReturnInputs(show) {
  const returnInputs = document.getElementById("returnInputs");
  const addReturnBtn = document.getElementById("addReturnBtn");
  const returnContainer = document.getElementById("returnContainer");

  if (show) {
    returnInputs.style.display = "block";
    addReturnBtn.style.display = "none";
        returnContainer.classList.remove("addReturnDiv");

  } else {
    returnInputs.style.display = "none";
    addReturnBtn.style.display = "block";
        returnContainer.classList.add("addReturnDiv");

  }
}

function handleFormSubmit(e) {
  e.preventDefault(); // Sayfanın yenilenmesini engelle

  const from = document.getElementById('fromInput')?.value;
  const to = document.getElementById('toInput')?.value;
  const pickupDate = document.getElementById('pickupDateInput')?.value;
  const pickupTime = document.getElementById('pickupTimeInput')?.value;
  const passengers = document.getElementById('passengersTransfer')?.value;

  console.log({
    from,
    to,
    pickupDate,
    pickupTime,
    passengers,
  });
    localStorage.setItem("transfer", JSON.stringify({
    from,
    to,
    pickupDate,
    pickupTime,
    passengers
  }));
  window.location.href = "../pages/transfer.html";

}

// HEADER
function setLoginType(type) {
  localStorage.setItem('loginType', type); 
}

function logout() {
  localStorage.clear();
  window.location.href = "../pages/login.html";
}

function loginAuth() {
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");
  const page = window.location.pathname.split("/").pop().toLowerCase();
  const restrictedPages = ["login.html", "register.html", "resetpassword.html"];
  const isRestricted = restrictedPages.includes(page);

  const pageTitlesEl = document.querySelector(".pagesTitles");
  const navFlexContainer = document.querySelector(".nav-flex-container");

  // Link renklerini değiştir
  document.querySelectorAll(".nav-link.text-white").forEach(link => {
    link.classList.toggle("text-black", isRestricted);
    link.classList.toggle("text-white", !isRestricted);
  });

  // Sayfa başlıklarını göster/gizle
  if (pageTitlesEl) {
    pageTitlesEl.style.display = isRestricted ? "flex" : "none";
  }

  // Menü hizasını değiştir
  if (navFlexContainer) {
    navFlexContainer.classList.toggle("justify-content-end", !isRestricted);
    navFlexContainer.classList.toggle("justify-content-between", isRestricted);
  }

  // Login başlığını göster
  const loginTitles = document.querySelectorAll("#loginTitle");
  loginTitles.forEach(el => el.style.display = "none");

  const pageTitleMap = {
    "login.html": "Login Account",
    "register.html": "Register Account",
    "resetpassword.html": "Password Recovery"
  };

  if (pageTitleMap[page]) {
    const title = document.querySelector("#loginTitle");
    if (title) {
      title.style.display = "block";
      title.textContent = pageTitleMap[page];
    }
  }

  // agency login nav ını kaldır
  const agencyLoginLink = document.getElementById("agencyLoginLink");
  if (token && agencyLoginLink) {
    agencyLoginLink.style.display = "none";
  }

  // Giriş yaptıysa login, register gibi sayfalara gitmesini engelle
  if (token && isRestricted) {
    window.location.href = "../pages/profile.html";
    return;
  }

  // Kullanıcı bilgilerini header'a yaz
  if (token && name) {
    const signInLink = document.querySelector("#signInLink");
    if (signInLink) {
     
      signInLink.innerHTML = `
        <div class="dropdown">
          <a class="text-white d-flex align-items-center text-decoration-none" data-bs-toggle="dropdown" style="cursor: pointer;">
            ${name}
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="../pages/profile.html">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item text-danger" onclick="logout()">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>
        <button onclick="logout()" class="btn btn-sm" style="color:#FD981D">
                <i class="bi bi-box-arrow-right"></i>
        </button>
`;
      signInLink.removeAttribute("href");
      signInLink.removeAttribute("target");
      signInLink.classList.remove("text-white");
    }
  }
}

