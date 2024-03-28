var paperHeight = 4*0.0254; // 4 inches
var paperWidth =6*0.0254; // 6 inches
var boxDepth = 5*0.0254; // 5 inches

function calculateDistance() {
  var subjectHeight = parseFloat(document.getElementById('height').value);
  var subjectWidth = parseFloat(document.getElementById('width').value);

  var distance; // Define the variable to hold the calculated value

  // Check ratio of paperHeight to height and paperWidth to width
  if ((paperHeight / subjectHeight) > (paperWidth / subjectWidth)) {
    // Calculate distance based on height
    distance = (boxDepth * subjectWidth / paperWidth);
  } else {
    // Calculate distance based on width
    distance = (boxDepth * subjectHeight / paperHeight);
  }

  // Output distance
  var outputElement = document.getElementById('output');
  outputElement.innerHTML = "Distance: " + distance + " cm";
  outputElement.style.display = 'block'; // Show the output
}