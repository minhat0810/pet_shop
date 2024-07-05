'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if(elem.length > 1){
     for( let i=0; i<elem.length; i++){
        elem[i].addEventListener(type,callback);
     }
  }else{
    elem.addEventListener(type,callback);
  }
}

/**
 * navbar toggle
 */

const navToggle = document.querySelector("[data-nav-toogler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar =  function () {
    navbar.classList.toggle("active");
    navToggle.classList.toggle("active");
}

addEventOnElem(navToggle,"click", toggleNavbar);

const closeNavbar = function (){
  navbar.classList.remove("active");
  navToggle.classList.remove("active");
}

addEventOnElem(navbarLinks,"click", closeNavbar);



/**
 * Thực hiện header khi window scroll xuống 10px
 */

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function (){
  if(window.scrollY > 100){
      header.classList.add("active");
  }
  else {
    header.classList.remove("active");
  }
}


addEventOnElem(window, "scroll", activeElemOnScroll);
/** mở đóng giỏ hnafg */
const cartBtn = document.querySelector(".close-cart")
//console.log(cartBtn)
const cartShow = document.querySelector(".bag")
cartShow.addEventListener("click",function(event){
 document.querySelector(".cart").style.right = "0"
})

cartBtn.addEventListener("click",function(event){
document.querySelector(".cart").style.right = "-100%"
})

//thêm 
const buyBtn = document.querySelectorAll(".main-product-info button")

buyBtn.forEach(function(button,index){
  // console.log(button,index);   
   button.addEventListener("click", function(event){{
      var btnItem = event.target
      var productJS = btnItem.parentElement.parentElement.parentElement.parentElement.parentElement
       var productImg = productJS.querySelector(".imgchinh img").src
       var productName = productJS.querySelector("H1").innerText
       var productPrice = productJS.querySelector(".giaban").innerText
       console.log(productPrice,productImg,productName)
      // var productName = productJS.querySelector("H3").innerText
      // var productPrice = productJS.querySelector("span").innerText
      
     //  console.log(productPrice,productName,productImg)
     addcart(productPrice,productName,productImg)
   }})
 })

// thêm giỏ hàng
function addcart(productPrice,productName,productImg){
  var addtr = document.createElement("tr") //tạo dòng
  var trContent = ' <tr><td style="display: flex;align-items: center;"><img src="'+productImg+'" width="100px" height="100px" alt=""><span class="title">'+productName+'</span></td><td><p><span class="prices">'+productPrice+'</span>VNĐ</p></td><td> <input type="number" value="1" min="1"></td><td style="cursor: pointer;text-align: center"><span class="cart-delete">Xóa</span></td></tr>'
  var cartItem = document.querySelectorAll("tbody tr")
  for(var i=0; i<cartItem.length;i++){
      var productTrung = document.querySelectorAll(".title")
     // console.log(productTrung)
        if(productTrung[i].innerHTML == productName){
          alert("Sản phẩm đã tồn tại trong giỏ hàng")
          return
        
      }
  }
  addtr.innerHTML = trContent //thêm trContent vào html
  var cartTable = document.querySelector("tbody") // lấy phần tử từ tbody
//   console.log(cartTable);
  cartTable.append(addtr) //thêm addtr vào tbody
  cartTotal()
  deleteCart()
  inputChange()
}

// hàm tính tổng tiền--------------
function cartTotal(){
  var cartItem = document.querySelectorAll("tbody tr")
  var totalPrice= 0;
  var productCount = 0;
  // console.log(cartItem.length)
  for(var i=0; i<cartItem.length; i++){
    // console.log(i)
    var inputValue = cartItem[i].querySelector("input").value
    // console.log(inputValue)
    var productPrice = cartItem[i].querySelector(".prices").innerHTML
    // console.log(productPrice)
  
 var  totalA = inputValue*productPrice*1000
    // console.log(totalA)
    productCount += 1
    totalPrice += totalA
    // console.log(totalPrice.toLocaleString('de-DE'))
  }

 var cartTotalPrice = document.querySelector(".price-total span")
 cartTotalPrice.innerHTML = totalPrice.toLocaleString('de-DE')
 var cartCount = document.querySelector(".count")
//  console.log(cartCount)
cartCount.innerHTML = productCount
//  console.log(cartTotalPrice) 
}


///----------------XÓA KHỎI GIỎ HÀNG------------- 

function deleteCart(){
var cartItem = document.querySelectorAll("tbody tr")
for(var i=0; i<cartItem.length;i++){
  var productTrung = document.querySelectorAll(".cart-delete")
  console.log(productTrung)
  productTrung[i].addEventListener("click",function(event){
    var cartDelete = event.target
    var cartItemN = cartDelete.parentElement.parentElement
    cartItemN.remove()
    cartTotal()
    // console.log(cartItemN)
  })     
  }
}

function inputChange()
{
var cartItem = document.querySelectorAll("tbody tr")
for(var i=0; i<cartItem.length;i++)
{
  var inputValue = cartItem[i].querySelector("input")
 // console.log(inputValue)
      inputValue.addEventListener("change",function(event)
  {
    cartTotal()
  })     
}
}

/**
  chuyển đổi hình ảnh sản phẩm
 */

  const heroSlider = document.querySelector("[data-hero-slider]");
  const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
  const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
  const heroSliderNextBtn = document.querySelector("[data-next-btn]");
  
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];
  
  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }
  
  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
  
    updateSliderPos();
  }
  
  heroSliderNextBtn.addEventListener("click", slideNext);
  
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
  
    updateSliderPos();
  }
  
  heroSliderPrevBtn.addEventListener("click", slidePrev);
  
  /**
   * auto slide
   */
  
  let autoSlideInterval;
  
  const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
      slideNext();
    }, 7000);
  }
  
  addEventOnElem([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });
  
  addEventOnElem([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
  
  window.addEventListener("load", autoSlide);

  const btnSP = document.querySelectorAll(".product button");

  //console.log(btnSP);

  btnSP.forEach(function(button,index){
   // console.log(button,index); 
    
    button.addEventListener("click", function(event){{
       var btnItem = event.target
       var productJS = btnItem.parentElement
       var productImg = productJS.querySelector("img").src
       var productName = productJS.querySelector("H3").innerText
       var productPrice = productJS.querySelector("span").innerText
       
      //  console.log(productPrice,productName,productImg)
      addcart(productPrice,productName,productImg)
    }})
  })

