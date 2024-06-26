function clearSymbol(){
  Array.from(document.getElementsByClassName("symbol")).forEach(symbol => {
    symbol.hidden = true;
  });
}
clearSymbol()

function clearResults(){
  let result = document.getElementsByClassName('result');
  let results = Array.from(result);
  results.forEach(function(element) {
    element.remove();
  });
};

// 清理生成的分身图片
function clearNoteCopies() {
  // 获取所有的分身图片
  var noteCopies = document.querySelectorAll('.note-copy');

  // 遍历并移除每个分身图片
  noteCopies.forEach(function(noteCopy) {
    noteCopy.parentNode.removeChild(noteCopy); // 从父元素中移除分身图片
  });
}

function dledgerline(name){
  //C4=1,B3=1,A3=2,G3=2,F3=3,E3=3
  if (name=='C4'){
   return 1
  }else{
    return (Math.round((8-pindex.indexOf(name[0]))/2))
  } 
}
function uledgerline(name){
  if (name.slice(-1)=='6'){
   return 2
  }else{
    return 1
  }
  
}
// 将文字转换为高度
function textToHeight(text) {
  var noteHeight = 0;
  var noteName = text[0].toUpperCase(); // 将字母转换为大写
  // 计算音符的基准高度
  switch (noteName) {
    case 'C': noteHeight = 136; break;
    case 'D': noteHeight = 129.5; break;
    case 'E': noteHeight = 123; break;
    case 'F': noteHeight = 117.5; break;
    case 'G': noteHeight = 111; break;
    case 'A': noteHeight = 104.5; break;
    case 'B': noteHeight = 98.5; break;
    default: noteHeight = 0; // 其他情况的默认高度为 0
   }
   if (text.length > 1) {
    var number = parseInt(text[text.length - 1]); // 获取最后一个字符作为数字
    noteHeight -= (number-4) * 42.7;
  }
  return noteHeight;
}

function print_error(text,value,part){
  let errors = document.createElement("div");
  errors.classList.add("result")
  errors.innerHTML = text;
  errors.value = value;
  errors.style.color = 'red'; 
  document.getElementById('container').appendChild(errors);
}

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

///////////////////////////
function check_range(ch, chlen, part, mini, maxi) {
  range_errors=""
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

function generate_notes(chn,part){
    let offsetX
    let offsetY
    // 循环生成副本图片
    for (let i = 0; i < chord_len; i++) {
      // 创建新的 Image 对象
      let copyImage = new Image();
  
      // 设置副本图片的 src 为模板图片的 src，实现复制
      copyImage.src = 'note.png';
      copyImage.style.width="22.8px";
      // 计算副本图片的位置
      
      offsetX = 210 + i*18*46.5/chord_len; // 每个副本图片在 x 方向上的偏移量
      offsetY = textToHeight(chn[i]); // 每个副本图片在 y 方向上的偏移量
      copyImage.classList.add('note-copy');
      // 设置副本图片的位置和 z-index
      copyImage.style.position = 'absolute'; // 设置为绝对定位
      copyImage.style.top = offsetY + 'px'; // 根据偏移量设置 top
      copyImage.style.left = offsetX + 'px'; // 根据偏移量设置 left
      copyImage.style.zIndex = 9; // 根据循环次数设置不同的 z-index
      copyImage.id = ('copyImage_' + (i+part*chord_len).toString());
      // 将副本图片添加到页面中
      document.body.appendChild(copyImage);
  
      if (chn[i].slice(-1)<4 || (chn[i].slice(-1)==4 && chn[i][0]=='C')){
        for (let n=0;n<dledgerline(chn[i]);n++){
          let ledger = document.createElement("div");
          ledger.classList.add("note-copy","ledger")
          ledger.style.top = 141+n*12.2+'px';
          ledger.style.left = offsetX-4.8 + 'px';
          document.body.appendChild(ledger);
        }
      }
      else if (chn[i].slice(-1)>5 || (chn[i].slice(-1)==5 && ['A','B'].includes(chn[i][0]))){
        for (let n=0;n<uledgerline(chn[i]);n++){
          let ledger = document.createElement("div");
          ledger.classList.add("note-copy","ledger")
          ledger.style.top = 68-n*12.2+'px';
          ledger.style.left = offsetX-4.8 + 'px';
          document.body.appendChild(ledger);
        }
        
      }
      
  
    }
}


var keysig='C'
// 檢查和聲的函數
function checkHarmony() {
  clearResults()
  clearNoteCopies();
  range_errors=''

  var ch0name = document.getElementById('sopranoInput').value.split('/');
  var ch1name = document.getElementById('altoInput').value.split('/');
  var ch2name = document.getElementById('tenorInput').value.split('/');
  var ch3name = document.getElementById('bassInput').value.split('/');

  var channel0=[]
  var channel1=[]
  var channel2=[]
  var channel3=[]
 
  for (let x of ch0name){channel0.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))}
  for (let x of ch1name){channel1.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))}
  for (let x of ch2name){channel2.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))}
  for (let x of ch3name){channel3.push(pitch_to_num(x.slice(0,-1),parseInt(x.slice(-1))))}
  alert(channel0+channel1+channel2+channel3)

  chord_len=ch0name.length

  if (check_range(channel0,chord_len,'一',60,81)){
    range_errors+="音超過音域"
    print_error(range_errors,range_errors.slice(5,-5).split(',').map(num => parseInt(num)))
  }
  if (check_range(channel1,chord_len,'二',55,74)){
    // 定義原始的數字陣列

    range_errors+="音超過音域"
  
    print_error(range_errors,range_errors.slice(5,-5).split(',').map(num => parseInt(num) + chord_len))
    //
  }

  
//////////////////////////////////////////////////////
generate_notes(ch0name,0)
generate_notes(ch1name,1)

}


document.addEventListener('click', function(event) {
  
  let result = event.target;
  if (result.classList.contains('result')) {
    if (result.style.color === 'blue') {
      result.style.color = 'red'; 
      
      let errorParts = result.value;
      
      
  
      for (let i = 0; i < errorParts.length; i++) {
        let copyImage = document.getElementById(('copyImage_' + (errorParts[i] - 1).toString()));
        
        copyImage.src = 'note.png'; 
      };
    }else { // 否则当前状态为红色
      result.style.color = 'blue'; 
      //setTimeout(10)
  
    // 根据 range_errors 中的信息，标记对应的分身图片
      let errorParts = result.value;
    
      for (let i = 0; i < errorParts.length; i++) {
        let copyImage = document.getElementById(('copyImage_' + (errorParts[i] - 1).toString()));
        copyImage.src = 'note_error.png'; 
      };
    }
  };
});


//////////////////////////////
let pname = document.getElementById('pname');
let key = document.getElementById('key');

document.addEventListener('DOMContentLoaded', function() {
  pname.addEventListener('change', updateKey);
  key.addEventListener('change', updateKey);
})
const sharp = ['G','D','A','E','B','F#','C#']
const flat =['F','Bb','Eb','Ab','Db','Gb','Cb']
const sharpm = ['Em','Bm','F#m','C#m','G#m','D#m','A#m']
const flatm =['Dm','Gm','Cm','Fm','Bbm','Ebm','Abm']

function updateKey() {
  clearSymbol()
  
  let pnamev = pname.value;
  let keyv = key.value;
  keysig=pnamev+keyv

  if (keyv==""){
    if (sharp.includes(pnamev)){ //Major
      for (let s=0;s<=sharp.indexOf(pnamev);s++){
        document.getElementById(("sharp"+s.toString())).hidden = false;
        document.getElementById(("bsharp"+s.toString())).hidden = false;
      } 
    }
    if (flat.includes(pnamev)){
      for (let s=0;s<=flat.indexOf(pnamev);s++){
        document.getElementById(("flat"+s.toString())).hidden = false;
        document.getElementById(("bflat"+s.toString())).hidden = false;
      } 
    }
  }else{
    if (sharpm.includes(pnamev+keyv)){
      for (let s=0;s<=sharpm.indexOf(pnamev+keyv);s++){
        document.getElementById(("sharp"+s.toString())).hidden = false;
        document.getElementById(("bsharp"+s.toString())).hidden = false;
      } 
    }
    if (flatm.includes(pnamev+keyv)){
      for (let s=0;s<=flatm.indexOf(pnamev+keyv);s++){
        document.getElementById(("flat"+s.toString())).hidden = false;
        document.getElementById(("bflat"+s.toString())).hidden = false;
      } 
    }
  }
}
