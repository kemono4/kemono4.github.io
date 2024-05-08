// 定義音高映射表
const pitch = {'C': 12, 'D': 14, 'E': 16, 'F': 17, 'G': 19, 'A': 21, 'B': 23};

// 檢查範圍錯誤的函數
function checkRange(ch, part, mini, maxi) {
  let errors = [];
  for (let i = 0; i < ch.length; i++) {
    if (ch[i] > maxi || ch[i] < mini) {
      errors.push(`${part}第${i + 1}音超出範圍`);
    }
  }
  return errors;
}

function pitch_to_num(name,octave) {
    let acd = 0; // 初始值為 0
    if (name.includes('#')) {
        acd = 1; // 升音
        name=name.slice(0,-1)
    } else if (name.includes('b')) {
        acd = -1; // 降音
        name=name.slice(0,-1)
    }
  acd+=12*octave
  if (pitch.includes('name')) {
    return pitch.name+acd
  }
}

// 檢查和聲的函數
function checkHarmony() {
  let key = document.getElementById('key').value
  alert(key)
  let ch0name = document.getElementById('sopranoInput').value.split('/');
  alert(ch0name)
  let channel0=[pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1)))for let x of ch0name]
  alert(channel0)
  //let ch1name = document.getElementById('altoInput').value.split('/');
  //let ch2name = document.getElementById('tenorInput').value.split('/');
  //let ch3name = document.getElementById('bassInput').value.split('/');



  let errors = [];

  let result = document.getElementById('result');
  result.innerHTML = ''; // 清空之前的結果

  if (errors.length > 0) {
    result.style.color = 'red';
    result.textContent = 'Errors:\n' + errors.join('\n');
  } else {
    result.style.color = 'green';
    result.textContent = "No Errors";
  }
}
