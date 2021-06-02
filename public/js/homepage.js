
//side bar
function openSidebar() {
  document.getElementById("mySidebar").style.display = "block";
}
function closeSidebar() {
  document.getElementById("mySidebar").style.display = "none";
}

// $('#viewAllB').click(function () {
//   $('.allBirds').css('display', 'none');
// })

document.querySelectorAll('.allBirds').on('click', function () {
  $('#viewAllB').hide();

})