$(document).ready(function(){
  var modal1 = document.getElementById("myModal1");

// Get the button that opens the modal
var btn1 = document.getElementById("btnmod1");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
}






var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("btnmod2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  else if(event.target==modal2){
    modal2.style.display="none";
  }
}




$("#allcategory1").click(function(){
      $(".dropdown-category").toggle()
     
})

$("#allcategory2").click(function(){
  $(".dropdown-category").toggle()
 
})


// SIDEBAR 

let buttonsidebar=document.getElementById("sidebarbtn");
let closesidebar=document.getElementById("closesidebar");
buttonsidebar.onclick=function(){
  document.getElementById("phonesidebar").style.width = "100%";
}
closesidebar.onclick=function(){
  document.getElementById("phonesidebar").style.width = "0";
}

// SLIDER

$('.slider').slick({
  // dots: true,
  infinite: true,
  speed: 300,
  // autoplay:true,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

})

