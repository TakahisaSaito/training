window.addEventListener("load", () => {

    const myFormElm = document.forms.myForm; // フォーム要素を取得

    myFormElm.addEventListener('submit', (e) => { // 送信ボタンが押されたら実行
        e.preventDefault();

        const formData = new FormData(myFormElm)

        fetch('submit.php', { // 第1引数に送り先
            method: 'POST', // メソッド指定
            // Content-Typeは指定しない
            body: formData // bodyにそのまま添付
        })
            .then(response => response.json()) // 返ってきたレスポンスをjsonで受け取って次のthenへ渡す
            .then(res => {
                console.log(res); // やりたい処理
                location.href = 'JOBlist.html?data=' + encodeURIComponent(res["name"]);
            })
            .catch(error => {
                console.log(error); // エラー表示
            });
        });
})