document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new URLSearchParams();
            formData.append("email", document.getElementById("email").value);
            formData.append("password", document.getElementById("password").value);
            
            fetch("/api/auth/login", { // 修正: 正しいURLに変更
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            })
            .then(response => {
                if (response.ok) { // 成功時の処理
                    return response.json(); // JSONレスポンスを取得
                } else {
                    throw new Error("ログインに失敗しました"); // エラー処理
                }
            })
            .then(data => {
                // トークンをローカルストレージに保存するなどの処理
                localStorage.setItem("token", data.token);
                window.location.href = "/"; // 成功時のリダイレクト先
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }
});
