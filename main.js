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