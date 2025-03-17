document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const productList = document.getElementById("product-list");

    // ログイン処理
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error("ログインに失敗しました");
                }

                const data = await response.json();
                alert("ログイン成功！");

                // トークンを保存（JWT の場合）
                localStorage.setItem("token", data.token);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // 商品一覧取得
    async function fetchProducts() {
        try {
            const response = await fetch("/api/products");
            if (!response.ok) {
                throw new Error("商品一覧の取得に失敗しました");
            }
            const products = await response.json();

            // 商品を表示
            productList.innerHTML = "";
            products.forEach((product) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>価格: ${product.price}円</p>
                `;
                productList.appendChild(li);
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    fetchProducts();
});
