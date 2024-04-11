function calculateDistance() {
  // Step 1: Initialize constant values and input variables
  var h1 = 4 * 0.0254; // 4 inches in meters
  var d1 = 5 * 0.0254; // 5 inches in meters
  var w1 = 6 * 0.0254; // 6 inches in meters
  var widthInput = document.getElementById('width');
  var heightInput = document.getElementById('height');
  var w2 = parseFloat(widthInput.value) / 2; // Width of the subject divided by 2
  var h2 = parseFloat(heightInput.value) / 2; // Height of the subject divided by 2
  var a1 = parseFloat(document.getElementById('cameraElevation').value); // Camera elevation
  var a2 = parseFloat(document.getElementById('subjectElevation').value); // Subject elevation

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
    
    return; // Exit the function early
  }

  // Set default value for subject elevation if blank
  if (!a2 && a2 !== 0) {
    a2 = 0; // Set subject elevation to 0 if blank
    // document.getElementById('subjectElevation').value = a2; // Set the input field value
  }

  // Set default value for camera elevation if blank
  if (!a1 && a1 !== 0) {
    a1 = h2+a2-h1; // Set camera elevation to h2 if blank
    // document.getElementById('cameraElevation').value = a1; // Set the input field value
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

  // Step 5: Calculate subjectCenterHeight and subjectSize
  if (d2height > d2width) {
    var subjectYDisplacement = delta_h / (2 * h1 * (d2height/d1));
    var subjectSize = h2 * d1 / (h1 * d2height);
  } else {
    var subjectYDisplacement = delta_h / (2 * h1 * (d2width/d1));
    var subjectSize = h2 * d1 / (h1 * d2width);
  }

  var subjectHeight = subjectSize;
  var subjectWidth = subjectHeight * w2/ h2; // Calculate subject width

  // Calculate frame width
  var frameSize = 50; // Define the variable for frame size, adjust as needed
  var frameWidth = frameSize * 6;
  var frameHeight = frameSize * 4;

  // Set CSS custom properties
  document.documentElement.style.setProperty('--subjectYDisplacement', subjectYDisplacement);
  document.documentElement.style.setProperty('--subjectHeight', subjectHeight);
  document.documentElement.style.setProperty('--subjectWidth', subjectWidth);
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
}
