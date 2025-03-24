document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("productList");
            productList.innerHTML = ""; // 初期化

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("col-md-4", "mb-4");

                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>${product.price}円</strong></p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">カートに追加</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            });

            // カートに追加処理
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    const productId = this.dataset.id;
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    if (!cart.includes(productId)) {
                        cart.push(productId);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert("カートに追加しました！");
                    } else {
                        alert("すでにカートに追加されています！");
                    }
                });
            });
        })
        .catch(error => console.error("商品データの取得に失敗:", error));
});
