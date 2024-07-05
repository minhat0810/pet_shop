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



// hàm tính tổng tiền--------------
//  function cartTotal(){
//     var cartItem = document.querySelectorAll("tbody tr")
//     var totalPrice= 0;
//     var productCount = 0;
//     // console.log(cartItem.length)
//     for(var i=0; i<cartItem.length; i++){
//       // console.log(i)
//       var inputValue = cartItem[i].querySelector("input").value
//       // console.log(inputValue)
//       var productPrice = cartItem[i].querySelector(".prices").innerHTML
//       // console.log(productPrice)
    
//    var  totalA = inputValue*productPrice*1000
//       // console.log(totalA)
//       productCount += 1
//       totalPrice += totalA
//       // console.log(totalPrice.toLocaleString('de-DE'))
//     }

//    var cartTotalPrice = document.querySelector(".price-total span")
//    cartTotalPrice.innerHTML = totalPrice.toLocaleString('de-DE')
//    var cartCount = document.querySelector(".count")
//   //  console.log(cartCount)
//   cartCount.innerHTML = productCount
//   //  console.log(cartTotalPrice) 
//  }
  

///----------------XÓA KHỎI GIỎ HÀNG------------- 

function deleteCart(){
  // trỏ tới tr trong tbldy
  // duyệt
  // chọn 
  var cartItem = document.querySelectorAll("tbody tr")
  // console.log(cartItem)
  for(var i=0; i<cartItem.length;i++){
    var productTrung = document.querySelectorAll(".cart-delete")
    //console.log(productTrung)
    productTrung[i].addEventListener("click",function(event){
      var cartDelete = event.target
      var cartItemN = cartDelete.parentElement.parentElement
      console.log(cartItemN)
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
        inputValue.addEventListener("change",function(event)
    {
      cartTotal()
    })     
  }
}

// mở đóng giỏ hàng
const cartBtn = document.querySelector(".close-cart")
 const cartShow = document.querySelector(".bag")
cartShow.addEventListener("click",function(event){
   document.querySelector(".cart").style.right = "0"
})

cartBtn.addEventListener("click",function(event){
  document.querySelector(".cart").style.right = "-100%"
})

//giỏ hàng ttsp

const buyBtn = document.querySelectorAll(".ttproduct button")
//console.log(buyBtn)
 
//duyệt
buyBtn.forEach(function(button,index){
   button.addEventListener("click",function(event){{
     var ttbtnItem = event.target
     var productJSP = ttbtnItem.parentElement.parentElement.parentElement
        //console.log(productJSP)
      var ttproductImg = productJSP.querySelector(".thumbnail img").src
        var ttproductName = productJSP.querySelector("H2").innerText
        var ttproductPrice = productJSP.querySelector("span").innerText
   // console.log(ttproductImg)
       console.log(ttproductImg,ttproductName,ttproductPrice)
     addcart(ttproductImg,ttproductName,ttproductPrice);
   }})
})

function addcart(ttproductImg,ttproductName,ttproductPrice){
  //  tạo dòng
  //  lấy tt sản phẩm
  //  thêm tt sp vào dòng
  //  thêm dòng vào tbody
   var ttaddTR = document.createElement("tr")
   var ttContent = '<tr><td style="display: flex;align-items: center;"><img src="'+ttproductImg+'" width="100px" height="100px" alt=""><span  class="title">'+ttproductName+'</span></td> <td><p><span>'+ttproductPrice+'</span>VNĐ</p></td> <td> <input type="number" value="1" min="1"></td>  <td style="cursor: pointer;text-align: center" ><span class="cart-delete">Xóa</span></td></tr><tr>'
   // console.log(ttContent)
  var cartItem = document.querySelectorAll("tbody tr")
  console.log(cartItem)
    for(var i=0; i<cartItem.length;i++){
      var productTrung = document.querySelectorAll(".title")
     // console.log(productTrung)
        if(productTrung[i].innerHTML == ttproductName){
          alert("Sản phẩm đã tồn tại trong giỏ hàng")
          return
        
      }
  }
   ttaddTR.innerHTML = ttContent;
 // lấy tt trong tbody
   var ttcartTable = document.querySelector("tbody")
   // append vào tbody
    ttcartTable.append(ttaddTR)
   // console.log(ttcartTable)
   cartTotal()
   inputChange()
   deleteCart()
 }

// function addcart(ttproductImg,ttproductName,ttproductPrice){
//   var addtr = document.createElement("tr") //tạo dòng
//   var trContent = ' <tr><td style="display: flex;align-items: center;"><img src="'+ttproductImg+'" width="100px" height="100px" alt=""><span class="title">'+ttproductName+'</span></td><td><p><span class="prices">'+ttproductPrice+'</span>VNĐ</p></td><td> <input type="number" value="1" min="1"></td><td style="cursor: pointer;text-align: center"><span class="cart-delete">Xóa</span></td></tr>'
//   var cartItem = document.querySelectorAll("tbody tr")
//   for(var i=0; i<cartItem.length;i++){
//       var productTrung = document.querySelectorAll(".title")
//      // console.log(productTrung)
//         if(productTrung[i].innerHTML == ttproductName){
//           alert("Sản phẩm đã tồn tại trong giỏ hàng")
//           return
        
//       }
//   }
//   addtr.innerHTML = trContent //thêm trContent vào html
//   var cartTable = document.querySelector("tbody") // lấy phần tử từ tbody
// //   console.log(cartTable);
//   cartTable.append(addtr) //thêm addtr vào tbody
//   cartTotal()
//   deleteCart()
//   inputChange()
// }

 function cartTotal(){
   var cartItem = document.querySelectorAll("tbody tr")
   //console.log(cartItem)
   var totalPrice = 0;
   var count=0;
   for(var i=0; i<cartItem.length;i++){
    var inputValue = cartItem[i].querySelector("span").innerText
    //console.log(inputValue)
    var ttproductPrice = cartItem[i].querySelector("input").value
    //console.log(ttproductPrice)
    var totalP = inputValue*ttproductPrice*1000
      count +=1
      totalPrice += totalP
   // console.log(totalPrice.toLocaleString("de-DE"))
   }
   var cartTotalPrice = document.querySelector(".price-total span")
   cartTotalPrice.innerHTML = totalPrice.toLocaleString("de-DE")
   var cartCount = document.querySelector(".count")
    cartCount.innerHTML = count
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

 