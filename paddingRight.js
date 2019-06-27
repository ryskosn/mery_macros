// TODO
// 1. 全体を関数の組み合わせにする
// 2. デリミタが正規表現の特殊文字として解釈される場合に対応する？


let text = document.selection.Text.split('\n');
let lines = [];

// 選択範囲の末尾の改行から生じる空行を削除
for (let i = 0; i < text.length; i++) {
  if (text[i].length > 0) {
    lines.push(text[i]);
  }
}

// デリミタは何か、プロンプトから入力を受ける
// デフォルトは全角コロン ： とする
let delimiter = prompt("delimiter?(default '：')", "");
if (!delimiter || delimiter.length < 1) {
  delimiter = '：';
}

/**
 * デリミタの左右それぞれの文字数の配列を求める
 * @param {array} arr - 改行で区切った各行の配列
 * @return {Object}
 */
function getLengths(arr) {
  let l = [];
  let r = [];
  let re
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].match(delimiter)) {
      let a = arr[i].split(delimiter);
      l.push(charCount(a[0]));
      r.push(charCount(a[1]));
    } else {
      continue;
    }
  }
  return { left: l, right: r };
}


/**
 * 全角を 2 、半角を 1 として文字数を数える
 * @param {string} str - 対象文字列
 * @return {number} len
 */
function charCount(str) {
  const re = /[a-zA-Z0-9`~!@#\$%\^&\*\(\)\-_=\+\[\]\{\}\\\|;:'"\,<\.>\/\? ]/i;
  let len = 0;

  for (let i = 0; i < str.length; i++) {
    if (re.test(str.charAt(i))) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}


function main() {
  let lengths = getLengths(lines);
  let lMax = Math.max.apply(null, lengths.left);
  let rMax = Math.max.apply(null, lengths.right);

  /**
   * コメントをあとで書く
   */
  function applyPadding(line) {
    let a = line.split(delimiter);
    let l = a[0];
    let r = a[1];
    while (charCount(l) < lMax) {
      l = l + ' ';
    }
    while (charCount(r) < rMax) {
      r = ' ' + r;
    }
    return l + delimiter + r;
  }

  let result = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(delimiter)) {
      result.push(applyPadding(lines[i]));
    } else {
      result.push(lines[i]);
    }
  }
  result = result.join('\n');

  outputbar.visible = true;
  outputbar.Clear();
  outputbar.Write(result);
}

document.selection.Replace("(　| )", "", meFindNext | meFindReplaceRegExp | meReplaceSelOnly | meReplaceAll);
main();
