const API_URL = 'http://localhost:5090/api';
let token = '';

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        token = data.token;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('recipe-section').style.display = 'block';
        loadRecipes();
    } else {
        alert(data.message);
    }
}

async function loadRecipes() {
    const res = await fetch(`${API_URL}/recipes`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const recipes = await res.json();
    
    const list = document.getElementById('recipe-list');
    list.innerHTML = recipes.map(r => `
        <div class="recipe-card">
            <h3>${r.title}</h3>
            <p><strong>Ingredientc:</strong> ${r.ingredients.join(', ')}</p>
            <p><strong>Time:</strong> ${r.cookingTime} мин</p>
            <p>${r.instructions}</p>
        </div>
    `).join('');
}

async function fetchRandomRecipe() {
    const res = await fetch(`${API_URL}/recipes/random`);
    const data = await res.json();
    
    const box = document.getElementById('random-recipe-box');
    box.innerHTML = `
        <div class="recipe-card" style="border: 2px solid #f39c12;">
            <img src="${data.image}" style="width:100px; border-radius:8px; float:right;">
            <h3>🌟 Рецепт дня: ${data.title}</h3>
            <p><strong>Категория:</strong> ${data.category}</p>
            <p style="font-size: 0.9em;">${data.instructions.substring(0, 200)}...</p>
            <a href="${data.source}" target="_blank">Читать полностью</a>
        </div>
    `;
}

function logout() {
    location.reload();
}