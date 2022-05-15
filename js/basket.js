let allAddButtons=document.querySelectorAll(".addToCartBtn");
let basketCount=document.getElementById('basketCount');
let table=document.getElementById('tbl-basket');


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
    let count=1;
    if(localStorage.getItem('basket')){
       let basket=JSON.parse(localStorage.getItem('basket'));
      if(basket.length>0){
            table.classList.remove('d-none');
            basket.forEach(product => {
            let name=product.name;
            let prod_count=product.count;
            let price=product.price;
            let totalprice=product.count*product.price;
            let imgsrc=product.image; 

               
            let html=`<tr id='table-tr'>
            <th scope="row">${count}</th>
            <td scope="row"><img style="width: 20%;" src="${imgsrc}"  alt=""></td>
            <td>${name.split(' ')[2]}</td>
            <td>$${Number(price).toFixed(1)}</td></td>
            <td class="td-quantity">
            <span class="btn-minus"><i class="klbth-icon-minus"></i></span>
            <span>${prod_count}</span>
            <span class="btn-plus"><i class="klbth-icon-plus"></i></span>
           
            </td>
            <td>$${Number(totalprice).toFixed(1)}</td>
            <td><i class="klbth-icon-cancel"></i></td>
          </tr>`
         
       
            table.lastElementChild.innerHTML+=html;
            count++;
            
        }); 
      }
    }
    else{
        

    }

}

GetBasketElement();

function IncreaseDecrease(){
    let minusbtns=document.querySelectorAll('.btn-minus')
            let plusbtns=document.querySelectorAll('.btn-plus')

            minusbtns.forEach(minusbtn => {
                minusbtn.onclick=function(e){
                    
                    if(Number(e.target.nextElementSibling.innerText)>1){
                          let product_count=Number(e.target.nextElementSibling.innerText)-1;
                          e.target.nextElementSibling.innerText=product_count;
                    }
                    else{
                        document.getElementById('table-tr').remove();
                    }
                  
                }
            });
           
           plusbtns.forEach(plusbtn=>{
            plusbtn.onclick=function(e){
                 console.log(e.target.previousElementSibling.innerText);
                let product_count=Number(e.target.previousElementSibling.innerText)+1;
                e.target.previousElementSibling.innerText=product_count;
              }
           })
}

IncreaseDecrease();


// let price="$103457349853798";
// console.log(price.indexOf("$"))
// console.log(price.slice(price.indexOf("$")+1,price.length))





