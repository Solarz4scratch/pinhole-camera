function calculateVolume() {
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);
  
    var volume = length * width * height;
  
    if (!isNaN(volume)) {
      document.getElementById('output').innerHTML = "Volume: " + volume + " cm³";
    } else {
      document.getElementById('output').innerHTML = "Please enter valid measurements.";
    }
  }