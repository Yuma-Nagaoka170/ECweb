function checkLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        document.getElementById('loginNav').classList.add('d-none');
        document.getElementById('registerNav').classList.add('d-none');
        document.getElementById('logoutNav').classList.remove('d-none');
    }
}

function logout() {
    localStorage.removeItem('user');
    alert('ログアウトしました');
    location.reload();
}

checkLogin();
