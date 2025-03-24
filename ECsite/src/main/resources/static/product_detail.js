document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        document.getElementById("product-detail").innerHTML = "<p>商品が見つかりません。</p>";
        return;
    }

    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = `¥${product.price}`;
            document.getElementById("product-image").src = `img/product${product.id}.jpg`;
            document.getElementById("add-to-cart").onclick = () => addToCart(product.id, product.name, product.price);
        })
        .catch(error => {
            document.getElementById("product-detail").innerHTML = "<p>商品情報の取得に失敗しました。</p>";
        });
});
