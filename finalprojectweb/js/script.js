$(document).ready(function() {
  
  // Chat Send Message
  const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  savedMessages.forEach(msg => {
    $('#messages').append(`<div class="text-end mb-2"><span class="badge bg-primary p-2">${msg}</span></div>`);
  });

  // New messages
  $('#sendBtn').click(function() {
    const msg = $('#msgInput').val().trim();
    if (msg) {
      // Adding to the modal
      $('#messages').append(`<div class="text-end mb-2"><span class="badge bg-primary p-2">${msg}</span></div>`);
      $('#msgInput').val('');
      $('#messages').animate({ scrollTop: $('#messages')[0].scrollHeight }, 500);

      // Saving to localStorage
      savedMessages.push(msg);
      localStorage.setItem('chatMessages', JSON.stringify(savedMessages));
    }
  });

  $('#msgInput').keypress(function(e) {
    if (e.key === 'Enter') $('#sendBtn').click();
  });

  $('#clearChat').click(function() {
     localStorage.removeItem('chatMessages');
     $('#messages').empty();
  });

  // Contact form validation 
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let message = $('#msg').val().trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      alert('Enter a valid email address.');
      return;
    }
    $('#successMsg')
    .fadeIn(300)           
    .delay(2000)               
    .fadeOut(800);
    this.reset();
  });

  // Tabs switch
  $('#tab-personal').click(function() {
    $('#groupChats').fadeOut(200, function() {
      $('#personalChats').fadeIn(200).removeClass('d-none');
    });
    $('#tab-personal').addClass('active');
    $('#tab-groups').removeClass('active');
  });

  $('#tab-groups').click(function() {
    $('#personalChats').fadeOut(200, function() {
      $('#groupChats').fadeIn(200).removeClass('d-none');
    });
    $('#tab-groups').addClass('active');
    $('#tab-personal').removeClass('active');
  });

  // Create new group
  $('#groupForm').submit(function(e) {
    e.preventDefault();
    const name = $('#groupName').val().trim();
    const category = $('#groupCategory').val();
    if (name === '') {
      alert('Please enter a group name');
      return;
    }
    alert(`Group "${name}" (${category}) created successfully!`);
    $('#createGroupModal').modal('hide');
    this.reset();
  });


  // Profile form validation
  $('#profileForm').submit(function(e) {
  e.preventDefault();
  const newName = $('#newName').val().trim();
  const newStatus = $('#newStatus').val();

  if (newName.length < 2) {
    alert('Name must be at least 2 characters long.');
    return;
  }

  $('#username').text(newName);
  $('#userstatus').text(newStatus);

  alert('Profile updated successfully!');
  this.reset();
  });

  // Weather
  const weatherBlock = document.getElementById("weatherText");
  if (weatherBlock) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current_weather=true")
      .then(res => res.json())
      .then(data => {
        const w = data.current_weather;
        weatherBlock.textContent = `Temperature: ${w.temperature}°C | Wind: ${w.windspeed} km/h`;
      })
      .catch(() => {
        weatherBlock.textContent = "Failed to load weather data";
      });
  }

  // Fact of the day
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/today")
    .then(response => response.json())
    .then(data => {
      document.getElementById("factText").textContent = data.text;
    })
    .catch(() => {
      document.getElementById("factText").textContent = "Could not load fact.";
    });
    
  const themeBtn = document.getElementById("themeToggle");
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
});
