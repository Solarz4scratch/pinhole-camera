var advancedShown = 0;
var outputShown = 0;
var outputHeight = 50;
var advancedHeight = 25;

function calculateDistance() {
  // Step 1: Initialize constant values and input variables
  var h1 = 2 * 0.0254; // half of 4 inches in meters
  var d1 = document.getElementById("cameraLength").value;
  var w1 = 3 * 0.0254; // half of 6 inches in meters
  var widthInput = document.getElementById('width');
  var heightInput = document.getElementById('height');
  var w2 = parseFloat(widthInput.value) / 2; // Width of the subject divided by 2
  var h2 = parseFloat(heightInput.value) / 2; // Height of the subject divided by 2
  var a1 = parseFloat(document.getElementById('cameraElevation').value); // Camera elevation
  var a2 = parseFloat(document.getElementById('subjectElevation').value); // Subject elevation
  var margin = parseFloat(document.getElementById('marginPercentage').value); 
  

  // Check if either width or height is blank
  if (!widthInput.value || !heightInput.value) {
    var outputElement = document.getElementById('output');
    outputElement.style.display = 'block'; // Show the output
    var distanceOutput = document.getElementById('distanceOutput');
    distanceOutput.innerHTML = "Please enter subject width and height!";
    distanceOutput.style.color = 'red'; // Change text color to red

    // Hide frame and subject elements
    document.getElementById('frame').style.display = 'none';
    document.getElementById('subject').style.display = 'none';
    document.getElementById('previewText').style.display = 'none';

    outputShown = 1;
    outputHeight = 20;
    document.body.style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    document.getElementById("particles-js").style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    
    return; // Exit the function early
  }

  // Set default value for subject elevation if blank
  if (!a2 && a2 !== 0) {
    a2 = 0; // Set subject elevation to 0 if blank
    document.getElementById('subjectElevation').value = a2; // Set the input field value
  }

  // Set default value for camera elevation if blank
  if (!a1 && a1 !== 0) {
    a1 = h2+a2-h1; // Set camera elevation to h2 if blank
    document.getElementById('cameraElevation').value = a1; // Set the input field value
  }

  if (!d1 && d1 !== 0) {
    d1 = 4.5 * 0.0254; // 4.5 inches in meters
    document.getElementById('cameraLength').value = d1 / 0.0254; // Set the input field value
  } else {
    d1 = d1 * 0.0254;
  }

  if (!margin && margin !== 0) {
    margin = 0;
    document.getElementById('marginPercentage').value = margin / 0.01; // Set the input field value
  } else {
    margin = margin * 0.01;
  }

  if (w2 <= 0 || h2 <= 0 || a1 < 0 || a2 < 0 || d1 <= 0) {
    var outputElement = document.getElementById('output');
    outputElement.style.display = 'block'; // Show the output
    var distanceOutput = document.getElementById('distanceOutput');
    distanceOutput.innerHTML = "Please enter valid field inputs!";
    distanceOutput.style.color = 'red'; // Change text color to red

    // Hide frame and subject elements
    document.getElementById('frame').style.display = 'none';
    document.getElementById('subject').style.display = 'none';
    document.getElementById('previewText').style.display = 'none';

    outputShown = 1;
    outputHeight = 20;
    document.body.style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    document.getElementById("particles-js").style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    
    return; // Exit the function early
  }

  // Step 2: Calculate d2height and d2width
  var d2height = d1 * h2 / h1;
  var d2width = d1 * w2 / w1;

  // Step 3: Calculate delta_h and delta_d
  var delta_h = a1 + h1 - a2 - h2;
  var delta_d = delta_h * d1 / h1;

  // Adjust d2height
  d2height += Math.abs(delta_d);

  // Step 4: Determine output based on greater value of d2height and d2width

  var outputDistance;
  if (d2height > d2width) {
    outputDistance = d2height;
  } else {
    outputDistance = d2width;
  }

  outputDistance = outputDistance * 1/(1-margin);

  var subjectYDisplacement = delta_h / (2 * h1 * (outputDistance/d1));
  var subjectSize = h2 * d1 / (h1 * outputDistance);


  var subjectHeight = subjectSize;
  var subjectWidth = subjectHeight * w2/ h2; // Calculate subject width

  // Calculate frame width
  var frameSize = 50; // Define the variable for frame size, adjust as needed
  var frameWidth = frameSize * 6;
  var frameHeight = frameSize * 4;

  var groundHeight = 0.5-subjectYDisplacement-subjectHeight/2 - a2 / (2 * h1 * (outputDistance/d1));

  // Set CSS custom properties]
  document.documentElement.style.setProperty('--subjectYDisplacement', subjectYDisplacement);
  document.documentElement.style.setProperty('--subjectHeight', subjectHeight);
  document.documentElement.style.setProperty('--subjectWidth', subjectWidth);
  document.documentElement.style.setProperty('--groundHeight', groundHeight);
  document.documentElement.style.setProperty('--frameWidth', frameWidth + 'px'); // Set frame width custom property
  document.documentElement.style.setProperty('--frameHeight', frameHeight + 'px');

  // Output distance
  var outputElement = document.getElementById('output');
  outputElement.style.display = 'block'; // Show the output
  var distanceOutput = document.getElementById('distanceOutput');
  distanceOutput.innerHTML = "Distance: " + outputDistance.toFixed(2) + " m";
  distanceOutput.style.color = '#4CAF50'; // Change text color to green



  // Show frame and subject elements
  document.getElementById('frame').style.display = 'block';
  document.getElementById('subject').style.display = 'block';
  document.getElementById('previewText').style.display = 'block';

  outputShown = 1;
  outputHeight = 50;
  document.body.style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
  document.getElementById("particles-js").style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
}

function openInfoPopup() {
  var infoPopup = document.getElementById("infoPopup");
  var overlay = document.getElementById("overlay");
  infoPopup.style.display = "block";
  overlay.style.display = "block"; // Show the overlay
}

function closeInfoPopup() {
  var infoPopup = document.getElementById("infoPopup");
  var overlay = document.getElementById("overlay");
  infoPopup.style.display = "none";
  overlay.style.display = "none"; // Hide the overlay
}

function toggleAdvancedOptions() {
  var advancedOptions = document.getElementById('advancedOptions');
  var advancedOptionsToggle = document.getElementById('advancedOptionsToggle');
  if (advancedOptions.style.display == 'none') {
    advancedOptions.style.display = 'block';
    advancedOptionsToggle.textContent = 'Hide advanced options';

    advancedShown = 1;
    document.body.style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    document.getElementById("particles-js").style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
  } else {
    advancedOptions.style.display = 'none';
    advancedOptionsToggle.textContent = 'Show advanced options';
    
    advancedShown = 0;
    document.body.style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
    document.getElementById("particles-js").style.height = (100 + advancedShown * advancedHeight + outputShown * outputHeight).toString() + "vh";
  }

}