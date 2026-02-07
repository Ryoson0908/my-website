// カートボタンが押された時の動き
const cartButton = document.querySelector('.add-cart-btn');

if (cartButton) {
    cartButton.addEventListener('click', function() {
        // ここに実行したいことを書く
        alert('カートに追加しました！\n（これはデモサイトです）');
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