document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOMContentLoaded イベント発火");

    // 商品一覧を取得
    fetchProducts();
});

async function fetchProducts() {
    try {
        console.log("🔄 商品一覧を取得開始...");

        // API から商品情報を取得
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error(`❌ 商品一覧の取得に失敗しました: HTTP ${response.status}`);
        }

        // JSON をパース
        const products = await response.json();
        console.log("📦 取得した商品データ:", products);

        // データが配列かどうか確認
        if (!Array.isArray(products)) {
            throw new Error("❌ 取得したデータが配列ではありません！");
        }

        if (products.length === 0) {
            throw new Error("⚠️ 商品データが空です！");
        }

        // 商品を表示するコンテナを取得
        const productContainer = document.getElementById("products-container");
        if (!productContainer) {
            throw new Error("❌ products-container が見つかりません");
        }

        // コンテナをクリア
        productContainer.innerHTML = "";

        // 商品リストを作成
        const row = document.createElement("div");
        row.className = "row";

        products.forEach((product) => {
            if (!product.name || !product.description || !product.price || !product.image) {
                console.warn("⚠️ 商品データが不完全です:", product);
                return; // 不完全な商品はスキップ
            }

            console.log("🛍 商品追加:", product);

            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='/static/images/no-image.png'">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-danger fw-bold">￥${Number(product.price).toLocaleString()}</p>
                        <button class="btn btn-primary w-100">🛒 購入する</button>
                    </div>
                </div>
            `;

            row.appendChild(col);
        });

        // コンテナに追加
        productContainer.appendChild(row);
        console.log("✅ 商品一覧の描画完了！");

    } catch (error) {
        console.error("❌ エラー:", error.message);
    }
}
