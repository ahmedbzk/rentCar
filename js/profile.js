window.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
      const name = localStorage.getItem("name") || "";
      const lastName = localStorage.getItem("lastName") || "";
      const email = localStorage.getItem("userEmail") || "";
      const phone = localStorage.getItem("phone") || "";

      document.getElementById("name").value = name;
      document.getElementById("lastName").value = lastName;
      document.getElementById("email").value = email;
      document.getElementById("phone").value = phone;
      // loader'ı gizle, container'ı göster
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#profileSettingsForm").style.display = "block";
    }, 1000);
});


function profileSettingsFormSave() {
  
  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  console.log("✅ Saved:", { name, lastName, email, phone });
}

function changePasswordFormSave(){
  const password = document.getElementById("oldPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const newPasswordAgain = document.getElementById("newPasswordAgain").value.trim();

  console.log("✅ Saved:", { password, newPassword, newPasswordAgain });

}





function setupNavClickLogger(clickedId) {
  document.querySelector("#profileSettingsForm").style.display = "none";
  document.querySelector("#passwordSettingsForm").style.display = "none";
  document.querySelector("#transferSettingsForm").style.display = "none";
  document.querySelector("#paymentSettingsForm").style.display = "none";
  document.querySelector("#loader").style.display = "flex";

  if(clickedId=="profileSettings"){
    document.querySelector("#profileSettings").style.color = "#FD991E";
    document.querySelector("#passwordSettings").style.color = "black";
    document.querySelector("#transferSettings").style.color = "black";
    document.querySelector("#paymentSettings").style.color = "black";
    setTimeout(() => {
      const name = localStorage.getItem("name") || "";
      const lastName = localStorage.getItem("lastName") || "";
      const email = localStorage.getItem("userEmail") || "";
      const phone = localStorage.getItem("phone") || "";

      document.getElementById("name").value = name;
      document.getElementById("lastName").value = lastName;
      document.getElementById("email").value = email;
      document.getElementById("phone").value = phone;
      // loader'ı gizle, container'ı göster
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#profileSettingsForm").style.display = "block";
    }, 1000);
  }
  else if(clickedId=="passwordSettings"){

    document.querySelector("#profileSettings").style.color = "black";
    document.querySelector("#passwordSettings").style.color = "#FD991E";
    document.querySelector("#transferSettings").style.color = "black";
    document.querySelector("#paymentSettings").style.color = "black";

    setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#passwordSettingsForm").style.display = "block";
    }, 1000);
  }
  else if(clickedId=="transferSettings"){
    document.querySelector("#profileSettings").style.color = "black";
    document.querySelector("#passwordSettings").style.color = "black";
    document.querySelector("#transferSettings").style.color = "#FD991E";
    document.querySelector("#paymentSettings").style.color = "black";

     setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#transferSettingsForm").style.display = "block";
    }, 1000);
  }
  else if(clickedId=="paymentSettings"){
    document.querySelector("#profileSettings").style.color = "black";
    document.querySelector("#passwordSettings").style.color = "black";
    document.querySelector("#transferSettings").style.color = "black";
    document.querySelector("#paymentSettings").style.color = "#FD991E";
     setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#paymentSettingsForm").style.display = "block";
    }, 1000);
  }

}