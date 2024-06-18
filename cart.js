document.getElementById('search-bar').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let list = document.getElementById('product-list');
    let items = list.getElementsByTagName('li');
    
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
});

function showList() {
    document.getElementById('product-list').style.display = 'block';
}

function hideList() {
    setTimeout(function() {
        document.getElementById('product-list').style.display = 'none';
    }, 100); 
}

function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    
    let totalCartPrice = 0; 

    cartItems.forEach(item => {
        const totalPriceFixed = item.totalPrice.toFixed(2);
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>السعر: $ ${item.price.toFixed(2)} </p>
                <p>الكمية: ${item.quantity}</p>
                <p>السعر الإجمالي:$ ${totalPriceFixed} </p>
            </div>

            <div class="buttons">
                <button onclick="decrementQuantity('${item.id}')">-</button>
                <button onclick="incrementQuantity('${item.id}')">+</button>
                <button onclick="removeItem('${item.id}')">حذف</button>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);


        totalCartPrice += item.totalPrice;
    });


    const totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.innerHTML = `السعر الإجمالي للسلة: $ ${totalCartPrice.toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
}

function decrementQuantity(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        cartItems[itemIndex].totalPrice -= cartItems[itemIndex].price;
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

function incrementQuantity(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    cartItems[itemIndex].quantity++;
    cartItems[itemIndex].totalPrice += cartItems[itemIndex].price;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

function removeItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

function checkout() {
    alert('شكرًا لك! تم استلام طلبك.');
    localStorage.removeItem('cart');
    updateCartDisplay();
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});
