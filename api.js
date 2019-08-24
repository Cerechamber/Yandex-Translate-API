var button = document.querySelector('button');
var text = document.querySelector('input'); 
var translate = document.querySelector('.translate');
var API_KEY = 'trnsl.1.1.20190215T081737Z.4654bba85809f8b7.4cb8e20981c7532bd2ef9e72f297918ec94dcd58';
var list_in = document.getElementById('list_in');
var opt_in = document.getElementById('opt_in');
var opt_out = document.getElementById('opt_out');
var cont = document.querySelector('.get_req');
var img = document.querySelector('img');
var code_in = 'ru';
var code_out = 'en';



window.onload = function(){
  opt_in.innerHTML = '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+
  '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'Русский';
  opt_out.textContent = 'Английский';


  var req = new XMLHttpRequest();
  var url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs";
  url += '?key=' + API_KEY;
  url += '&ui=ru';
  req.addEventListener('load', function(){
    var response = JSON.parse(req.response); 

       if (!response.langs) {
      translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    var arr = new Array();
    var arr_key = new Array();
    var i = 0;
    for (var key in response.langs) {
      arr[i] = response.langs[key];
      arr_key[i] = key;
      i++;
    }

   for (var y = 0; y < arr.length; y++) {
      var str = document.createElement('p');
      str.style.margin = '5px';
      str.style.width = '30px';
    str.style.color = '#00f';
    str.style.cursor = 'pointer';
      str.innerHTML = arr[y];
      if (y <= 23) {
         list_in.firstElementChild.appendChild(str);
      }
      else if (y > 23 && y <= 46) {
        list_in.firstElementChild.nextElementSibling.appendChild(str);
      }
      else if (y > 46 && y <= 70) {
        list_in.lastElementChild.previousElementSibling.appendChild(str);
      }
      else {
        list_in.lastElementChild.appendChild(str);
      }
    }

    var list_out = list_in.cloneNode(true);
    list_out.style.left = '383px';
    cont.insertBefore(list_out ,button);


  opt_in.addEventListener('click', function(){
    list_in.classList.toggle('toggle');
    if (!list_out.classList.contains('toggle'))
     list_out.classList.toggle('toggle');
  });

    opt_out.addEventListener('click', function(){
   list_out.classList.toggle('toggle');
    if (!list_in.classList.contains('toggle'))
     list_in.classList.toggle('toggle');
  });

    list_in.addEventListener('click', function(ev){
  var target = ev.target;
  if (target.tagName == 'P') {
    var str = target.textContent;
    str = getspace(str);
      opt_in.textContent = str;
    var t = arr.indexOf(target.textContent);
    code_in = arr_key[t];
     list_in.classList.toggle('toggle');
  }

});
    

        list_out.addEventListener('click', function(ev){
  var target = ev.target;
  if (target.tagName == 'P') {
    opt_out.textContent = target.textContent;
    var t = arr.indexOf(target.textContent);
    code_out = arr_key[t];
     list_out.classList.toggle('toggle');
  } 

});

        list_in.addEventListener('mouseleave', function(){
      if (!list_in.classList.contains('toggle'))
     list_in.classList.toggle('toggle');

    });

    list_out.addEventListener('mouseleave', function(){
      if (!list_out.classList.contains('toggle'))
     list_out.classList.toggle('toggle');

    });

function getspace(str){
  if (str == 'Азербайджанский') str = 'Азербайджанский';
     else if (str == 'Шотландский (гэльский)') str = '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'Шотландский'+
        ' \n\r'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+' (гэльский)';
     else if (str == 'Коса') str = '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+
      '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+str;
     else {
      var q = 15 - str.length;
      var space = '';
      for (var i = 0; i <= q; i++) {
        space += '\u00A0'+'\u00A0';
      }
     str = space + str;
     }
      return str;
}

 img.addEventListener('click', function(){
        var str = opt_out.textContent;
        var change = opt_in.textContent;
        var empty = '\u00A0';
        while (change[0] == empty) {
          change = change.replace(empty, '');
        }
        opt_out.textContent = change;
        opt_in.textContent = getspace(str);
          var change_code = code_in;
          code_in = code_out;
          code_out = change_code;
        });

    
  });
  req.open('get', url);
  req.send();

}



button.addEventListener('click', function() {
  translate.innerHTML = '';
  var req = new XMLHttpRequest();
  
  var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

  if (text.value) {
  url += '?key=' + API_KEY;
  url += '&text=' + text.value; 
  url += '&lang=' + code_in + '-' + code_out;
  
  req.addEventListener('load', function () {
    var response = JSON.parse(req.response);

    if (response.code !== 200) {
      translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    if (response.text.length === 0) {
      translate.innerHTML = 'К сожалению, перевод для данного слова не найден';
      return;
    }

    translate.innerHTML = response.text.join('<br>'); 
  });

  req.open('get', url);
  req.send();
  }
});
