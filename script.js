// STEP 1: Select HTML Elements

let cartCount = document.getElementById("cart-count");

let cartItems = document.getElementById("cart-items");

let cartTotal = document.getElementById("cart-total");

let clearButton = document.getElementById("clear-cart");


// STEP 2: Create Shopping Cart Array

let cart = [];


// STEP 3: Select Add to Cart Buttons

let buttons = document.querySelectorAll(".add-btn");


// STEP 4: Add Event Listener

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let name = button.getAttribute("data-name");

        let price = Number(button.getAttribute("data-price"));

        // Check whether product already exists

        let existingProduct = cart.find(function(product) {

            return product.name === name;

        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }

        updateCart();

    });

});


// STEP 5: Update Cart Function

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach(function(product, index) {

        let item = document.createElement("li");

        item.textContent =
            product.name + " - ₹" + product.price;


        // Decrease Quantity Button

        let minusButton = document.createElement("button");

        minusButton.textContent = "-";


        minusButton.addEventListener("click", function() {

            if (product.quantity > 1) {

                product.quantity--;

            } else {

                cart.splice(index, 1);

            }

            updateCart();

        });


        // Show Quantity

        let quantityText = document.createElement("span");

        quantityText.textContent = " Quantity: " + product.quantity;


        // Increase Quantity Button

        let plusButton = document.createElement("button");

        plusButton.textContent = "+";


        plusButton.addEventListener("click", function() {

            product.quantity++;

            updateCart();

        });


        // Remove Product Button

        let removeButton = document.createElement("button");

        removeButton.textContent = "Remove";


        removeButton.addEventListener("click", function() {

            cart.splice(index, 1);

            updateCart();

        });


        // Add buttons to list

        item.appendChild(minusButton);

        item.appendChild(quantityText);

        item.appendChild(plusButton);

        item.appendChild(removeButton);


        cartItems.appendChild(item);


        // Calculate Total

        total = total + (product.price * product.quantity);

        count = count + product.quantity;

    });


    // Update Cart Count

    cartCount.textContent = count;


    // Update Total Price

    cartTotal.textContent = total;

}


// STEP 6: Empty Cart Function

clearButton.addEventListener("click", function() {

    cart = [];

    updateCart();

});
//let searchInput = document.getElementById("searchInput");

//searchInput.addEventListener("input", function() {

    //let searchValue = searchInput.value.toLowerCase();

    //let products = document.querySelectorAll(".product-card");

    //products.forEach(function(product) {

        //let productName = product.querySelector("h3").textContent.toLowerCase();

        //if (productName.includes(searchValue)) {
           // product.style.display = "block";
        //} else {
        //    product.style.display = "none";
        //}

    //});

//});
let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");

function filterProducts() {

    let searchValue = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let productName = product.querySelector("h3").textContent.toLowerCase();
        let productCategory = product.getAttribute("data-category");

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory = selectedCategory === "all" ||
                              productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });
}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);
// WISHLIST FEATURE

let wishlist = [];

let productCards = document.querySelectorAll(".product-card");

productCards.forEach(function(card) {

    let wishlistButton = document.createElement("button");

    wishlistButton.textContent = "♡ Add to Wishlist";
    wishlistButton.classList.add("wishlist-btn");

    card.appendChild(wishlistButton);

    wishlistButton.addEventListener("click", function() {

        let productName = card.querySelector("h3").textContent;

        if (wishlist.includes(productName)) {
            wishlist = wishlist.filter(function(item) {
                return item !== productName;
            });

            wishlistButton.textContent = "♡ Add to Wishlist";
        } else {
            wishlist.push(productName);
            wishlistButton.textContent = "♥ Added to Wishlist";
        }

        updateWishlist();

    });

});


function updateWishlist() {

    let wishlistItems = document.getElementById("wishlist-items");

    wishlistItems.innerHTML = "";

    wishlist.forEach(function(item) {

        let li = document.createElement("li");

        li.textContent = item;

        wishlistItems.appendChild(li);

    });

}