// main.js - Client-side JavaScript

// Function to handle form validation
function validateForm() {
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    
    if (!latInput || !lngInput) return true; // Not on the form page
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid numeric coordinates');
      return false;
    }
    
    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90 degrees');
      return false;
    }
    
    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180 degrees');
      return false;
    }
    
    return true;
  }
  
  // Add form validation
  const locationForm = document.getElementById('location-form');
  if (locationForm) {
    locationForm.addEventListener('submit', function(event) {
      if (!validateForm()) {
        event.preventDefault();
      }
    });
  }
  
  // Handle error messages fadeout
  const errorAlert = document.querySelector('.error-alert');
  if (errorAlert) {
    setTimeout(() => {
      errorAlert.style.opacity = '0';
      errorAlert.style.transition = 'opacity 1s ease';
      setTimeout(() => {
        errorAlert.style.display = 'none';
      }, 1000);
    }, 5000);
  }
  
  // Responsive navigation toggle
  document.addEventListener('DOMContentLoaded', function() {
    // Add more interactive features here as needed
    console.log('UV Sunscreen Advisor app loaded');
  });