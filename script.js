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

// 檢查和聲的函數
function checkHarmony() {
  let key = document.getElementById('key').value

  let sopranoInput = document.getElementById('sopranoInput').value.trim();
  let altoInput = document.getElementById('altoInput').value.trim();
  let tenorInput = document.getElementById('tenorInput').value.trim();
  let bassInput = document.getElementById('bassInput').value.trim();

  let sopranoArray = sopranoInput.split('/');
  let altoArray = altoInput.split('/');
  let tenorArray = tenorInput.split('/');
  let bassArray = bassInput.split('/');

  // 將音高名稱轉換為數字並檢查範圍
  let sopranoNumbers = sopranoArray.map(elem => {
    let note = elem.charAt(0);
    let octave = parseInt(elem.slice(-1));
    let acd = 0; // 初始值為 0
    if (elem.includes('#')) {
        acd = 1; // 升音
    } else if (elem.includes('b')) {
        acd = -1; // 降音
    }
    return (pitch[note] || 0) + acd + (12 * octave);
  });
  let altoNumbers = altoArray.map(elem => {
    let note = elem.charAt(0);
    let octave = parseInt(elem.slice(-1));
    let acd = 0; // 初始值為 0
    if (elem.includes('#')) {
        acd = 1; // 升音
    } else if (elem.includes('b')) {
        acd = -1; // 降音
    }
    return (pitch[note] || 0) + acd + (12 * octave);
  });
  let tenorNumbers = tenorArray.map(elem => {
    let note = elem.charAt(0);
    let octave = parseInt(elem.slice(-1));
    return (pitch[note] || 0) + (12 * octave);
  });
  let bassNumbers = bassArray.map(elem => {
    let note = elem.charAt(0);
    let octave = parseInt(elem.slice(-1));
    return (pitch[note] || 0) + (12 * octave);
  });

  let errors = [];

  // 檢查各聲部音高是否超出範圍
  errors = errors.concat(checkRange(sopranoNumbers, '女高音', 60, 81));
  errors = errors.concat(checkRange(altoNumbers, '女低音', 55, 74));
  errors = errors.concat(checkRange(tenorNumbers, '男高音', 48, 69));
  errors = errors.concat(checkRange(bassNumbers, '男低音', 41, 62));

  // 顯示結果
  let result = document.getElementById('result');
  result.innerHTML = ''; // 清空之前的結果

  if (errors.length > 0) {
    result.style.color = 'red';
    result.textContent = 'Errors:\n' + errors.join('\n');
  } else {
    result.style.color = 'green';
    result.textContent = 'No errors found. Harmony is valid!';
  }
}
