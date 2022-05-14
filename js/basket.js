let allAddButtons=document.querySelectorAll(".addToCartBtn");
let basketCount=document.getElementById('basketCount');


    if(!localStorage.getItem('basket')){
        localStorage.setItem('basket',JSON.stringify([])); 
    }

allAddButtons.forEach(btn=>{
    btn.onclick=function(e){
        e.preventDefault();

        if(!localStorage.getItem('basket')){
            localStorage.setItem('basket',JSON.stringify([])); 
        }
        let basket=JSON.parse(localStorage.getItem('basket'));
        let prod_id= e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
        let prod_price=e.target.parentElement.previousElementSibling.lastElementChild.innerText;
        let prod_name=e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
        let prod_img=e.target.parentElement.parentElement.parentElement.previousElementSibling.src;
        let existProd=basket.find(product=>product.id==prod_id); 
     
       if(existProd===undefined){
        basket.push({
         id:prod_id,
         name:prod_name,
         count:1,
         price:prod_price.slice(prod_price.indexOf("$")+1,prod_price.length),
         image:prod_img

        })
       }
       else{ 
        existProd.count++; 
       }

       localStorage.setItem('basket',JSON.stringify(basket));
       WriteBasketCount(); 
    }



})

function WriteBasketCount(){
    let basket=JSON.parse(localStorage.getItem('basket'));
    basketCount.innerText=basket.length; 
}

WriteBasketCount();


function GetBasketElement(){

    if(localStorage.getItem('basket')){
       let basket=JSON.parse(localStorage.getItem('basket'));
      if(basket.length>0){
        basket.forEach(product => {
            let name=product.name;
            let count=product.count;
            let price=product.price;
            let totalprice=product.count*product.price;
            let imgsrc=product.image; 
        }); 
      }
    }
    else{

    }

}

GetBasketElement();



// let price="$103457349853798";
// console.log(price.indexOf("$"))
// console.log(price.slice(price.indexOf("$")+1,price.length))





