window.addEventListener("load", () => {

    // --------------------table_data Class------------------------------
    class table_data {

        constructor() {
            let  name = location.href.split("?")[1].split('=')[1];

            fetch('get_list.php', { // 第1引数に送り先
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify([name])
            })
                .then(response => {
                    console.log(response);
                    return response.json(); // 返ってきたレスポンスをjsonで受け取って次のthenへ渡す
                })
                .then(res => {
                    console.log(res);   
                    this.array_list = res;
                    console.log(this.array_list);
                    this.edit_status();
                    this.output_table();
                })
                .catch(error => {
                    console.log(error); // エラー表示
                });

        }

        edit_status(){
            // この関数は数値で入っている状態データを文字に変換するのだが、
            // 変換する箇所をインデックス番号で指定しているので改善する必要がある
            let edit_array = [];
          
            for(let data of this.array_list){
            let status = '';
            switch(data[5]){
                case "0":status = "作業中";
                break;
                case "1":status = "チェック中";
                break;
                case "2":status = "チェック終了";
                break;
                case "3":status = "作業終了";
                break;
            }

            data.pop();
            data.push(status);                          
            edit_array.push(data);
            };
            this.array_list  = edit_array;
                    
        }

        

        output_table() {
            // 配列をそのまま出力する
            let tbody = document.getElementById('data_table').tBodies[0];

            for (let list_data of this.array_list) {
                let i = 0;

                for (let i = 0; i < list_data.length; i++) {
                    if (i == 0) {
                        let last_index_add = tbody.insertRow(-1).insertCell(-1);
                        last_index_add.appendChild(document.createTextNode(list_data[0]));
                    } else {
                        let last_cell_add = tbody.rows[tbody.rows.length - 1].insertCell(i);
                        last_cell_add.appendChild(document.createTextNode(list_data[i]));
                    };
                };
            }
        }

        delete_cell() {
            let tbody = document.getElementById('data_table');
            for (; tbody.rows.length > 1;) {
                tbody.deleteRow(1);
            }
        }

        array_sort(number, order = true) {
            // 配列を並び替える、第１引数は対象のインデックス番号
            // 、第２引数は昇順(true)降順(false)（初期値は昇順）
            this.array_list.sort(function (x, y) {
                if (order) {
                    return x[number] < y[number] ? -1 : 0;
                } else {
                    return x[number] > y[number] ? -1 : 0;
                }

            })
        }

        test() {
            console.log(this.array_list);
        }
    }
    // --------------------table_data Class------------------------------

    
    // ボタンクリック時の並び替えイベントを作成
    function sort_button_set() {
        for (let i = 0; i < document.getElementsByClassName('sort_button').length; i++) {
            let sort_flag = true;
            document.getElementsByClassName('sort_button')[i].addEventListener("click", () => {
                sort_flag == true ? sort_flag = false : sort_flag = true;
                data.delete_cell();
                data.array_sort(i, sort_flag);
                data.output_table();
            });
        }
    };

    document.querySelector("button").addEventListener('click', () => { // 送信ボタンが押されたら実行

        location.href = 'registration.html?data=' + encodeURIComponent("takesita");

    });

    let data = new table_data();

    sort_button_set();

})