document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

			const formData = new URLSearchParams();
			            formData.append("email", document.getElementById("email").value);
			            formData.append("password", document.getElementById("password").value);
						
						fetch("/login", {
						                method: "POST",
						                headers: {
						                    "Content-Type": "application/x-www-form-urlencoded"
						                },
						                body: formData
						            })
						            .then(response => {
						                if (response.redirected) {
						                    window.location.href = response.url; // 成功時のリダイレクト
						                } else {
						                    throw new Error("ログインに失敗しました");
						                }
						            })
						            .catch(error => {
						                alert(error.message);
						            });
						        });
						    }
						});
