// 定義音高映射表
const pitch = [12,14,16,17,19,21,23];
const pindex =["C","D","E", "F", "G", "A", "B"]
// 檢查範圍錯誤的函數
var range_errors=""
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
  if (pindex.includes(name)) {
    return pitch[pindex.indexOf(name)]+acd
  }
}

function check_range(ch, chlen, part, mini, maxi) {
  let first_error=false;
  for (let i = 0; i < chlen; i++) {
    if (ch[i] > maxi || ch[i] < mini) {
      if (first_error==false){
        range_errors+=`第${part}聲部第`
        first_error=true
      }else{
        range_errors+=","
      }
      range_errors+=i+1
    }
  }
  return first_error;
}

// 檢查和聲的函數
function checkHarmony() {
  let key = document.getElementById('key').value
  let ch0name = document.getElementById('sopranoInput').value.split('/');
  let ch1name = document.getElementById('altoInput').value.split('/');
  let ch2name = document.getElementById('tenorInput').value.split('/');
  let ch3name = document.getElementById('bassInput').value.split('/');

  let channel0=[]
  let channel1=[]
  let channel2=[]
  let channel3=[]
 
  for (let x of ch0name){
    channel0.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))
  }
  for (let x of ch1name){
    channel1.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))
  }
  for (let x of ch2name){
    channel2.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))
  }
  for (let x of ch3name){
    channel3.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))
  }
  alert(channel0+channel1+channel2+channel3)

  chord_len=ch0name.length

  if (check_range(channel0,chord_len,'一',60,81)){
    range_errors+="音超過音域"
}



  let result = document.getElementById('result');
  result.innerHTML = ''; // 清空之前的結果

  if (range_errors.length > 0) {
    result.style.color = 'red';
    result.textContent = range_errors;
  } else {
    result.style.color = 'green';
    result.textContent = "";
  }
}
