

window.addEventListener('DOMContentLoaded', () => {
  const loginType = localStorage.getItem('loginType') || 'user'; 

  const titleE2 = document.getElementById('loginSubTitle');
  const form = document.getElementById('loginForm');
  const registerLink = document.getElementById('registerLink');

 
     if (titleE2) {
      titleE2.textContent = loginType === 'agency' ? 'AGENCY LOGIN' : 'LOGIN';
    }


  form.addEventListener('submit', function (e) {
  e.preventDefault();


    
  if (registerLink) {
    registerLink.href = `../pages/register.html?type=${loginType}`;
  }

  const email = form.querySelector('input[type="email"]')?.value.trim();
  const password = form.querySelector('input[type="password"]')?.value;

  if (!email || !password) {
    showAlert("Please enter both email and password.", "warning");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address.", "danger");
    return;
  }

  if (password.length < 6) {
    showAlert("Password must be at least 6 characters.", "danger");
    return;
  }

  // Simulated accessToken (in real apps this comes from the server)
  const accessToken = generateAccessToken();

  // Save all user data to localStorage
  localStorage.setItem("userEmail", email);
  localStorage.setItem("loginType", "user");
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("name", 'Mehmet');
  localStorage.setItem("lastName", 'Andiç');
  localStorage.setItem("phone", '+905386456532');

  showAlert("Login successful!", "success");
  form.reset();

  // Redirect to profile page
  window.location.href = "../pages/profile.html";
});

  function generateAccessToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
});



function signIn(value){
  localStorage.setItem('loginType',value)
}