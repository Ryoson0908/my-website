// カートボタン（LINEで注文機能・実戦版）
const cartButtons = document.querySelectorAll('.add-cart-btn');

cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 1. ページ内の商品名を取得
        // （h1タグを探して文字を取ってくる）
        const productName = document.querySelector('.item-title').innerText;
        
        // 2. 選ばれているサイズを取得
        // （チェックが入っているラジオボタンの隣のラベル文字を取ってくる）
        const selectedSize = document.querySelector('input[name="size"]:checked + label').innerText;
        
        // 3. 送るメッセージを作る
        // 「\n」は改行という意味です
        const textMessage = `こんにちは！注文をお願いします。\n\n【注文内容】\n商品：${productName}\nサイズ：${selectedSize}\n\n在庫はありますでしょうか？`;

        // 4. URL用に日本語を変換する（エンコードといいます）
        // LINEアプリに渡すためには、変な記号に変換する必要があります
        const encodedMessage = encodeURIComponent(textMessage);
        
        // 5. LINEを起動するURLを作る
        
        // 【変更前】（今のコード：送信相手を選ぶタイプ）
        // const lineUrl = `https://line.me/R/msg/text/?${encodedMessage}`;

        // 【変更後】（あなたの公式アカウントIDを入れるタイプ）
        // ※「@luckpot」の部分を、あなたの公式アカウントID（＠から始まるやつ）に変えてください！
        const lineUrl = `https://line.me/R/oaMessage/@luckpot/?${encodedMessage}`;

        // 6. いざ、LINEへジャンプ！
        // 「本当に開きますか？」と確認してから飛ばす
        if (confirm(`以下の内容でLINEを起動します。\n\n${productName} / Size: ${selectedSize}`)) {
            window.location.href = lineUrl;
        }
    });
});

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