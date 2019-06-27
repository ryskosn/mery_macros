// プロンプトから入力を受ける
// period * 30 日分を表示する
let period = prompt("period? (default 1 = 30 days, if put in 2, 60 days)", "");
if (!period || period.length < 1) {
  period = 1;
}

function writeDays() {
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

  for (let i = 0; i < 30 * period; i++) {
    let today = new Date();
    today.setDate(today.getDate() + i);

    let month = today.getMonth() + 1;
    let date = today.getDate();
    let day = today.getDay();

    // zero padding
    // month = ('0' + month).slice(-2);
    date = ('0' + date).slice(-2);
    let dateString = '・' + month + '月' + date + '日（' + dayNames[day] + '）';

    // outputbar に出力する場合
    // outputbar.Write(dateString);
    // outputbar.Write("\n\n");

    // カーソル位置に出力する場合
    document.Write(dateString);
    document.Write("\n\n");
  }
}

// outputbar に出力する場合
// outputbar.visible = true;
// outputbar.Clear();

writeDays();
