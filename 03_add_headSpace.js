const arr = [
  ["^", "　"],
  ["^( |　)+?\\n", "\\n"],
  ["^　■", "■"]
];

for (let i = 0; i < arr.length; i++) {
  document.selection.Replace(arr[i][0], arr[i][1], meFindNext | meFindAround | meFindReplaceRegExp | meReplaceSelOnly | meReplaceAll);
}
