
//side bar
function openSidebar() {
  document.getElementById("mySidebar").style.display = "block";
}
function closeSidebar() {
  document.getElementById("mySidebar").style.display = "none";
}

$('#hiding').on('click', () => {
  $('#mapMain').css('display', 'none')
});