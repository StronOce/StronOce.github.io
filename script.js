/* --- MATRIX RAIN EFFECT --- */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];
for( let x = 0; x < columns; x++ ) { rainDrops[x] = 1; }

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0'; ctx.font = fontSize + 'px monospace';
    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){ rainDrops[i] = 0; }
        rainDrops[i]++;
    }
};
setInterval(draw, 30);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* --- E-COMMERCE & LOGIN LOGIC --- */
let cart = [];
let isLoggedIn = false;
let userName = "";

const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const pillStep = document.getElementById('pill-step');
const loginForm = document.getElementById('login-form');
const btnBlue = document.getElementById('btn-blue-pill');
const btnRed = document.getElementById('btn-red-pill');
const userDisplay = document.getElementById('user-display');
const usernameText = document.getElementById('username-text');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex'; pillStep.classList.remove('hidden'); loginForm.classList.add('hidden');
});
closeLogin.addEventListener('click', () => { loginModal.style.display = 'none'; });

btnBlue.addEventListener('click', () => {
    alert("Seçim yapıldı. Cehalet mutluluktur...");
    document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:20%'>SİSTEMDEN ÇIKILIYOR...</h1>";
    setTimeout(() => { window.location.href = "https://www.google.com"; }, 2000);
});

btnRed.addEventListener('click', () => { pillStep.classList.add('hidden'); loginForm.classList.remove('hidden'); });

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const pass = document.getElementById('pass-input').value;
    if(email.includes("@gmail.com") && pass.length >= 6) {
        isLoggedIn = true; userName = email.split('@')[0];
        loginBtn.classList.add('hidden'); userDisplay.classList.remove('hidden');
        usernameText.textContent = userName.toUpperCase();
        loginModal.style.display = 'none';
        alert(`OPERATÖR ${userName.toUpperCase()} SİSTEME YÜKLENDİ.`);
    } else {
        alert("GEÇERSİZ ERİŞİM VERİSİ. Lütfen geçerli bir Gmail ve en az 6 haneli şifre girin.");
    }
});

/* --- SEPET & FİLTRELEME --- */
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

document.getElementById('cart-toggle').addEventListener('click', () => cartSidebar.classList.add('active'));
document.getElementById('close-cart').addEventListener('click', () => cartSidebar.classList.remove('active'));

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        if(btn.getAttribute('onclick').includes(`'${category}'`)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) { card.style.display = "flex"; }
        else { card.style.display = "none"; }
    });
}

function addToCart(id, name, price) {
    cart.push({ id, name, price }); updateCartUI(); cartSidebar.classList.add('active');
}

function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }

function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) { cartItemsContainer.innerHTML = '<p class="empty-msg">VERİ BULUNAMADI...</p>'; }
    else {
        cart.forEach((item, index) => {
            const div = document.createElement('div'); div.classList.add('cart-item');
            div.innerHTML = `<div>${item.name}<br><small>₺${item.price}</small></div>
                <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">[SİL]</button>`;
            cartItemsContainer.appendChild(div);
        });
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = '₺' + total;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if(!isLoggedIn) { alert("ERİŞİM REDDEDİLDİ. ÖNCE SİSTEME GİRİŞ YAP."); return; }
    if(cart.length === 0) { alert("VERİ YOK."); return; }
    alert(`TRANSFER TAMAMLANDI. NEO SENİNLE GURUR DUYUYOR, ${userName}.`);
    cart = []; updateCartUI(); cartSidebar.classList.remove('active');
});