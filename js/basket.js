let allAddButtons=document.querySelectorAll(".addToCartBtn");
let basketCount=document.getElementById('basketCount');
let table=document.getElementById('tbl-basket');
let emptyBasket=document.getElementById("emptybasket");
let processedSubTotal=document.getElementById("processed-sub-total");
let processedTotal=document.getElementById("processed-total")

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
            let prod_id=product.id
            let name=product.name;
            let prod_count=product.count;
            let price=product.price;
            let totalprice=product.count*product.price;
            let imgsrc=product.image; 

               
            let html=`<tr id='table-tr'>
            <th scope="row">${count}</th>
            <td scope="row"><img style="width: 20%;" src="${imgsrc}"  alt=""></td>
            <td>${name.split(' ')[2]}</td>
            <td>$${Number(price).toFixed(2)}</td></td>
            <td class="td-quantity">
                <span data-id=${prod_id} class="btn-minus">-</span>
                <span>${prod_count}</span>
                <span data-id=${prod_id} class="btn-plus">+</span>
           
            </td>
            <td class="eachProductTotal">$${Number(totalprice).toFixed(2)}</td>
            <td><i style="cursor:pointer" class="removeProductTr klbth-icon-cancel"></i></td>
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
                          let current_product_total_price=e.target.parentElement.previousElementSibling.innerText;

                          e.target.parentElement.nextElementSibling.innerText=
                          `$${(Number(product_count)*Number(current_product_total_price.slice(current_product_total_price.indexOf("$")+1,current_product_total_price.length))).toFixed(1)}`;
                          e.target.nextElementSibling.innerText=product_count;
                          
                          let basket=JSON.parse(localStorage.getItem("basket"));
                          let product= basket.find(product=>product.id==e.target.getAttribute("data-id"));
                          product.count--;
                          let newArr= [];
                          basket.map(item=>{
                              if(item.id==product.id){
                                item=product;
                              }
                                newArr.push(item)
                          })
                          localStorage.setItem("basket",JSON.stringify(newArr));

                          Calculateprocessed();
                          RemoveTable();
                          CalculateTotal();
                          

                          
                    }
                    else{
                        let basket= JSON.parse(localStorage.getItem("basket"));
                        let id=Number(e.target.getAttribute("data-id"));
                        let newBasket=basket.filter(product=>product.id!=id);
                        basket=newBasket;
                        if(basket.length<1){
                            table.classList.add('d-none');
                            emptyBasket.classList.add("d-none");
                        }
                        localStorage.setItem("basket",JSON.stringify(basket));
                        RemoveTable();
                        document.getElementById('table-tr').remove();
                        WriteBasketCount();
                        CalculateTotal();
                       
                    }
                  
                }
            });
           
           plusbtns.forEach(plusbtn=>{
            plusbtn.onclick=function(e){
                let product_count=Number(e.target.previousElementSibling.innerText)+1;

                let current_product_total_price=e.target.parentElement.previousElementSibling.innerText;

                e.target.parentElement.nextElementSibling.innerText=
                `$${(Number(product_count)*Number(current_product_total_price.slice(current_product_total_price.indexOf("$")+1,current_product_total_price.length))).toFixed(1)}`;
                e.target.previousElementSibling.innerText=product_count;

                let basket=JSON.parse(localStorage.getItem("basket"));
                let product= basket.find(product=>product.id==e.target.getAttribute("data-id"));
                product.count++;
                let newArr= [];
                basket.map(item=>{
                    if(item.id==product.id){
                      item=product;
                    }
                      newArr.push(item)
                })
                localStorage.setItem("basket",JSON.stringify(newArr));
                Calculateprocessed();
                CalculateTotal();
              }
           })
}

IncreaseDecrease();

function Calculateprocessed() {
    let eachProductTotal=document.querySelectorAll(".eachProductTotal");
    let processedTotalPrice=0;
    eachProductTotal.forEach(item=>{
    processedTotalPrice+=Math.ceil(item.innerText.slice(item.innerText.indexOf("$")+1,item.innerText.length));
      
})
    processedSubTotal.innerText=`$${processedTotalPrice}`;
    processedTotal.innerText=`$${processedTotalPrice}`;
    
}
Calculateprocessed()

function RemoveProductTr(){
    let cancelButtons=document.querySelectorAll(".removeProductTr");
   cancelButtons.forEach(cancelButton=>{
    cancelButton.onclick=function(e){
        e.target.parentElement.parentElement.remove();
    }
    RemoveTable();
   })
   
}
RemoveProductTr();

function RemoveTable() {
    let basket=JSON.parse(localStorage.getItem("basket"));
    if(basket.length<1){
        table.style.display="none";
        document.getElementById("totaltable").style.display="none"
       
    }
    else{
        emptyBasket.style.display="none"
        document.getElementById("totaltable").style.display="block"
    }
}
RemoveTable();

function CalculateTotal(){
    let total=0
    let basket=JSON.parse(localStorage.getItem("basket"));
    basket.forEach(item=>{
        total+=Number(item.price)*Number(item.count)
    })
    document.getElementById("totalid").innerText=total.toFixed(2);
}

CalculateTotal();





