let cart=[];

function addtocart(name, price) {
    let item =cart.find(p => p.name ===name);

    if (item){
        item.qty++;

    } else{
        cart.push({name,price,qty:1});

    }
    updatecart();

}

function updatecart(){
    const cartItems=document.getElementById("cartitems");
    const totalel =document.getElementById("total");

    cartItems.innerHTML="";
    let total=0;
    
    cart.forEach((item,index)=>{
        total += item.price*item.qty;

        let li=document.createElement("li");
        li.className ="cart-item";
        li.innerHTML = `<span>${item.name}</span>
        <div>
            <button class="qty-btn" onclick="changeqty(${index},-1)">-</button>
            ${item.qty}
            <button class="qty-btn" onclick="changeqty(${index},1)">+</button>
            <button class="remove-btn" onclick="removeitem(${index})">x</button>
        </div>`;
        cartItems.appendChild(li);
    });
    totalel.innerText=total;
}

function changeqty(index, value){
    cart[index].qty += value;
    if(cart[index].qty<=0) {
        cart.splice(index, 1);

    }
    updatecart();
}

function removeitem(index){
    cart.splice(index,1);
    updatecart();
}