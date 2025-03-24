let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, productName, price) {
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("カートに追加しました！");
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total-price");

    if (!cartContainer || !totalContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} x${item.quantity} - ¥${item.price * item.quantity}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "削除";
        removeButton.onclick = () => removeFromCart(item.id);

        itemElement.appendChild(removeButton);
        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    totalContainer.textContent = `合計: ¥${total}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);
