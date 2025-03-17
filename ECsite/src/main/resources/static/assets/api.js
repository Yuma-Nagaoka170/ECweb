const API_URL = "http://localhost:8080/api";

async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
}
