// カートボタンが押された時の動き
const cartButton = document.querySelector('.add-cart-btn');

if (cartButton) {
    cartButton.addEventListener('click', function() {
        // ここに実行したいことを書く
        alert('カートに追加しました！\n（これはデモサイトです）');
    });
}