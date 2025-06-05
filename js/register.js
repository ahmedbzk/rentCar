window.addEventListener('DOMContentLoaded', () => {
    const registerUserForm = document.getElementById('registerUserForm');
    const registerAgencyForm = document.getElementById('registerAgencyForm');
    const urlParams = new URLSearchParams(window.location.search);
    const registerType = localStorage.getItem('loginType')|| 'user';
    const titleE2 = document.getElementById('registerSubTitle');

    console.log('registerType',registerType)
  if (registerType === 'user') {
    registerUserForm.style.display = 'block';
    registerAgencyForm.style.display = 'none';
  } else {
    registerUserForm.style.display = 'none';
    registerAgencyForm.style.display = 'block';
  }

    if (titleE2) {
      titleE2.textContent = registerType === 'agency' ? 'AGENCY REGISTER' : 'REGISTER';
    }

    registerUserForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Sayfa yenilenmesini engelle

      const name = document.getElementById('nameInput')?.value.trim();
      const lastName = document.getElementById('lastNameInput')?.value.trim();
      const email = document.getElementById('emailInput')?.value.trim();
      const password = document.getElementById('passwordInput')?.value;
      const confirmPassword = document.getElementById('passwordConfirmInput')?.value;
      const phone = document.getElementById('phoneInput')?.value.trim();


      // Validation
      if (!name || !lastName || !email || !password || !confirmPassword || !phone) {
  showAlert("Please fill in all the fields.", "warning");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
  showAlert("Please enter a valid email address.", "danger");
        return;
      }

      if (password !== confirmPassword) {
  showAlert("Passwords do not match.", "danger");
        return;
      }

      if (password.length < 6) {
  showAlert("Password must be at least 6 characters long.", "warning");
        return;
      }

      console.log('user',{
        name,
        lastName,
        email,
        password,
        confirmPassword,
        phone
      });

showAlert("Registration successful. You can now log in.", "success");
      registerUserForm.reset();
    });

    registerAgencyForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Sayfa yenilenmesini engelle

      const companyName = document.getElementById('companyAgencyInput')?.value.trim();
      const authPerson = document.getElementById('authPersonAgencyInput')?.value.trim();
      const email = document.getElementById('emailAgencyInput')?.value.trim();
      const workPhone = document.getElementById('workPhoneAgencyInput')?.value;
      const gsm = document.getElementById('GSMAgencyInput')?.value;
      const adress = document.getElementById('adresAgencyInput')?.value.trim();


      // Validation
      if (!companyName || !authPerson || !email || !workPhone || !gsm || !adress) {
  showAlert("Please fill in all the fields.", "warning");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
  showAlert("Please enter a valid email address.", "danger");
        return;
      }

      console.log('agency',{
        companyName,
        authPerson,
        email,
        workPhone,
        gsm,
        adress
      });

showAlert("Registration successful. You can now log in.", "success");
      registerAgencyForm.reset();
    });
  });