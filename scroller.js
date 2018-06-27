var lastScrollHeight = 0;
function ScrollDown(){
  setTimeout(function() {
    
    var sh = document.documentElement.scrollHeight;
    console.log(sh);
    if (sh != lastScrollHeight) {      
      lastScrollHeight = sh;
      //document.documentElement.scrollTop = sh;
      window.scroll({
        top: sh,
        behavior: "smooth"
      });
    }
    ScrollDown();
  }, 200)
}

window.onscroll = function() { console.log("scroll"); };

ScrollDown();

