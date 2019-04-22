<script>
var newElement = document.createElement("li");
newElement.innerHTML = "Listening to test.php.";
document.getElementById("progress-list").appendChild(newElement);

/*var evtSource = new EventSource("test.php");

evtSource.onmessage = function(e) {
  var msgElement = document.createElement("li");
  
  newElement.innerHTML = "message: " + e.data;
  progress-list.appendChild(newElement);
}
*/
</script>