document.addEventListener("DOMContentLoaded", function() {
    const checkoutButton = document.getElementById("checkout");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                alert("カートが空です。");
                return;
            }

            fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cart })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("決済に失敗しました");
                }
                return response.json();
            })
            .then(data => {
                alert("決済完了しました！");
                localStorage.removeItem("cart");
                window.location.href = "index.html";
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }
});
