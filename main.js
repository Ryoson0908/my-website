// ===============================================
// 本格的ショッピングカート機能
// ===============================================

// 1. カートデータの準備（保存されたデータがあれば読み込む）
let cart = JSON.parse(localStorage.getItem('luckpot_cart')) || [];

// 部品の取得
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// 2. カートを開閉する機能
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault(); // ページ移動しないようにする
        openCart();
    });
}
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

function openCart() {
    cartModal.classList.add('open');
    cartOverlay.classList.add('open');
    renderCart(); // 表示を更新
}
function closeCart() {
    cartModal.classList.remove('open');
    cartOverlay.classList.remove('open');
}

// 3. 「ADD TO CART」ボタンが押された時の機能
const addButtons = document.querySelectorAll('.add-cart-btn');
addButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 商品情報をHTMLから抜き出す
        const title = document.querySelector('.item-title').innerText;
        const priceText = document.querySelector('.item-price').innerText;
        const price = parseInt(priceText.replace(/[^0-9]/g, '')); // "¥8,800" → 8800 に変換
        const image = document.querySelector('.item-gallery img').src;
        
        // サイズを取得（もし選択がなければMとする）
        const sizeInput = document.querySelector('input[name="size"]:checked');
        const size = sizeInput ? sizeInput.nextElementSibling.innerText : 'M';

        // 商品オブジェクトを作る
        const newItem = {
            id: Date.now(), // 現在時刻をIDにする
            title: title,
            price: price,
            image: image,
            size: size
        };

        // カートに追加して保存
        cart.push(newItem);
        saveCart();
        updateCartCount();
        
        alert('カートに追加しました！');
        openCart(); // カートを開く
    });
});

// 4. カート画面を描画する（商品を表示する）機能
function renderCart() {
    cartItemsContainer.innerHTML = ''; // 一旦クリア
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">カートは空です。</p>';
        cartTotalElement.innerText = '¥0';
        return;
    }

    cart.forEach(item => {
        total += item.price;
        // HTMLを作る
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>Size: ${item.size} | ¥${item.price.toLocaleString()}</p>
                <button onclick="removeItem(${item.id})" class="remove-btn">削除</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalElement.innerText = '¥' + total.toLocaleString();
}

// 5. 商品を削除する機能
window.removeItem = function(id) {
    if(confirm('削除しますか？')) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
    }
};

// 6. データを保存・カウント更新
function saveCart() {
    localStorage.setItem('luckpot_cart', JSON.stringify(cart));
}
function updateCartCount() {
    if(cartCountElement) cartCountElement.innerText = cart.length;
}
// 読み込み時にカウント更新
updateCartCount();

// 7. まとめてLINEで注文する機能
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert('カートは空です');

        let message = "こんにちは！以下の商品をまとめて注文したいです。\n\n";
        let total = 0;

        cart.forEach((item, index) => {
            message += `【${index + 1}】${item.title}\nSize: ${item.size} / ¥${item.price.toLocaleString()}\n`;
            total += item.price;
        });

        message += `\n合計金額: ¥${total.toLocaleString()}\n\n在庫確認をお願いします！`;

        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
        
        if(confirm('LINEを起動して注文しますか？')) {
            window.location.href = lineUrl;
            // 注文後にカートを空にするなら以下を有効化
            // cart = []; saveCart(); renderCart(); updateCartCount();
        }
    });
}

// ハンバーガーメニューの開閉機能
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    });
}

// ローディング画面の制御
window.addEventListener('load', function() {
    const loader = document.getElementById('loading');
    
    // 少しだけ遅らせて消す（ロゴを見せるため）
    setTimeout(function() {
        loader.classList.add('loaded');
    }, 1000); // 1000ミリ秒 = 1秒後に消える
});

// スクロールして表示エリアに入ったらアニメーション
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // 画面に入ったら show クラスを追加
        }
    });
});

// 監視対象の要素を探す
const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach((el) => observer.observe(el));

// ヒーローロゴの高度なマウストラッキング（GSAP）
const heroSection = document.getElementById('hero-section');
const heroLogo = document.getElementById('hero-logo');

if (heroSection && heroLogo && window.gsap) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const diffX = e.clientX - centerX;
        const diffY = e.clientY - centerY;

        // 移動量（マウスに引っ張られる感覚）
        const moveX = Math.max(-28, Math.min(28, diffX * 0.03));
        const moveY = Math.max(-20, Math.min(20, diffY * 0.03));

        // 3D回転（奥行き表現）
        const rotateY = Math.max(-10, Math.min(10, diffX * 0.02));
        const rotateX = Math.max(-10, Math.min(10, -diffY * 0.02));

        // ロゴへの距離に応じたスケール（近いほど少し大きい）
        const logoRect = heroLogo.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const logoCenterY = logoRect.top + logoRect.height / 2;
        const distance = Math.hypot(e.clientX - logoCenterX, e.clientY - logoCenterY);
        const maxDistance = Math.hypot(window.innerWidth, window.innerHeight) / 1.9;
        const proximity = Math.max(0, 1 - distance / maxDistance);
        const scale = 1 + proximity * 0.06;

        gsap.to(heroLogo, {
            x: moveX,
            y: moveY,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: scale,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: 'auto'
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        gsap.to(heroLogo, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto'
        });
    });
}
