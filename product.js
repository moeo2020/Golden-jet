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
function increment(button) {
    let input = button.parentElement.querySelector('input');
    let value = parseInt(input.value);
    input.value = value + 1;
}

function decrement(button) {
    let input = button.parentElement.querySelector('input');
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}function addToCart(button) {
    const productElement = button.closest('.product');
    const productName = productElement.querySelector('h2').textContent;
    const priceText = productElement.querySelector('.price').textContent;
    const productPrice = parseFloat(priceText.replace('$', ''));
    const productImage = productElement.querySelector('img').src; // هنا نحصل على عنوان الصورة
    const quantity = parseInt(productElement.querySelector('input').value);
    const totalPrice = productPrice * quantity;

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += totalPrice;
    } else {
        const productId = Math.random().toString(36).substr(2, 9);
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage, // نضيف عنوان الصورة إلى العناصر في السلة
            quantity: quantity,
            totalPrice: totalPrice
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('تم إضافة المنتج إلى السلة');
    productElement.querySelector('input').value = 1; // إعادة تعيين العداد إلى 1
}


