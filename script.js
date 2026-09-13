
// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("myshopCart")) || [];


// ===============================
// WISHLIST
// ===============================

let wishlist = JSON.parse(localStorage.getItem("myshopWishlist")) || [];

function addToWishlist(name) {

    if (wishlist.includes(name)) {
        return;
    }

    wishlist.push(name);

    localStorage.setItem(
        "myshopWishlist",
        JSON.stringify(wishlist)
    );

    updateWishlist();
}


function updateWishlist() {

    const wishlistItems = document.getElementById("wishlistItems");

    if (!wishlistItems) {
        return;
    }

    wishlistItems.innerHTML = "";

    wishlist.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item}</span>

            <button onclick="removeFromWishlist(${index})">
                Remove
            </button>
        `;

        wishlistItems.appendChild(li);
    });
}


function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem(
        "myshopWishlist",
        JSON.stringify(wishlist)
    );

    updateWishlist();
}


// ===============================
// ADD TO CART
// ===============================

function addtocart(name, price) {

    let item = cart.find(p => p.name === name);

    if (item) {

        item.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: 1
        });

    }

    localStorage.setItem(
        "myshopCart",
        JSON.stringify(cart)
    );

    updatecart();
}


// ===============================
// UPDATE CART
// ===============================

function updatecart() {

    const cartItems = document.getElementById("cartitems");
    const totalel = document.getElementById("total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !totalel) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;
        itemCount += item.qty;

        const li = document.createElement("li");

        li.className = "cart-item";

        li.innerHTML = `
            <span>${item.name}</span>

            <div>

                <button class="qty-btn"
                    onclick="changeqty(${index}, -1)">
                    -
                </button>

                ${item.qty}

                <button class="qty-btn"
                    onclick="changeqty(${index}, 1)">
                    +
                </button>

                <button class="remove-btn"
                    onclick="removeitem(${index})">
                    x
                </button>

            </div>
        `;

        cartItems.appendChild(li);
    });

    totalel.innerText = total.toLocaleString();

    if (cartCount) {
        cartCount.innerText = itemCount;
    }
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeqty(index, value) {

    cart[index].qty += value;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "myshopCart",
        JSON.stringify(cart)
    );

    updatecart();
}


// ===============================
// REMOVE CART ITEM
// ===============================

function removeitem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "myshopCart",
        JSON.stringify(cart)
    );

    updatecart();
}


// ===============================
// SEARCH
// ===============================

function searchProducts() {

    applyFilters();
}


// ===============================
// CATEGORY FILTER
// ===============================

let selectedCategory = "All";

function filterProducts(category) {

    selectedCategory = category;

    applyFilters();
}


// ===============================
// APPLY SEARCH + CATEGORY
// ===============================

function applyFilters() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const productName =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

        const description =
            product.querySelector("p")
            .innerText
            .toLowerCase();

        const productCategory =
            product.getAttribute("data-category");

        const matchesSearch =
            productName.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


// ===============================
// SCROLL TO CART
// ===============================

function scrollToCart() {

    const cartBox =
        document.querySelector(".card");

    if (cartBox) {

        cartBox.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ===============================
// PRODUCT DETAILS
// ===============================

function showDetails(name, image, description, price) {

    document.getElementById("detailsName").innerText =
        name;

    document.getElementById("detailsImage").src =
        image;

    document.getElementById("detailsDescription").innerText =
        description;

    document.getElementById("detailsPrice").innerText =
        price.toLocaleString();

    document.getElementById("detailsCartButton").onclick =
        function() {

            addtocart(name, price);

            closeDetails();

        };

    document.getElementById("detailsModal").style.display =
        "flex";
}


function closeDetails() {

    document.getElementById("detailsModal").style.display =
        "none";
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const checkoutSection =
        document.getElementById("checkout-section");

    checkoutSection.style.display = "block";

    displayCheckoutItems();

    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// DISPLAY CHECKOUT ITEMS
// ===============================

function displayCheckoutItems() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.qty;

        total += itemTotal;

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${item.name} × ${item.qty}
            </span>

            <strong>
                $${itemTotal.toLocaleString()}
            </strong>
        `;

        checkoutItems.appendChild(li);
    });

    checkoutTotal.innerText =
        "$" + total.toLocaleString();
}


// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // CHECK NAME

    if (name === "") {
        alert("Please enter your name.");
        return;
    }


    // CHECK PHONE

    if (phone === "") {
        alert("Please enter your phone number.");
        return;
    }


    // CHECK ADDRESS

    if (address === "") {
        alert("Please enter your delivery address.");
        return;
    }


    // CHECK PAYMENT

    if (!payment) {
        alert("Please select a payment method.");
        return;
    }


    // CALCULATE TOTAL

    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.qty;

    });


    // SUCCESS MESSAGE

    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Customer: " + name + "\n" +
        "Payment: " + payment.value + "\n" +
        "Total: $" + total.toLocaleString() +
        "\n\nThank you for shopping with My Shop!"
    );


    // CLEAR CART

    cart = [];

    localStorage.setItem(
        "myshopCart",
        JSON.stringify(cart)
    );


    // UPDATE CART

    updatecart();


    // CLEAR FORM

    document.getElementById("customerName").value = "";

    document.getElementById("customerPhone").value = "";

    document.getElementById("customerAddress").value = "";


    // CLEAR PAYMENT

    payment.checked = false;


    // HIDE CHECKOUT

    document.getElementById(
        "checkout-section"
    ).style.display = "none";


    // GO TO TOP

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// LOAD SAVED DATA
// ===============================

updatecart();

updateWishlist();