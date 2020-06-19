//---------------------------------------------ЭКРАН ВЫБОРА СТОРОН И ПРИСВОЕНИЯ ЦВЕТОВОЙ СХЕМЫ---------------------------


let side //Переменная, которая будет принимать значение выбранной стороны: jedi/sith
window.onload= start();
function start(){
    if(localStorage.side){ //Проверка на наличие ранее выбранной стороны, которая сохраняется в local storage с ключем side
        side = localStorage.side 
        if(localStorage.side == "jedi"){
            let scr = document.body.querySelector(".choose__scr");
            scr.classList.add("hide");
            let main = document.querySelector(".main");
            main.classList.add("jediScheme");
            main.classList.remove("hide");
        } else if(localStorage.side == "sith"){
            let scr = document.body.querySelector(".choose__scr");
            scr.classList.add("hide");
            let main = document.querySelector(".main");
            main.classList.add("sithScheme");
            main.classList.remove("hide");
        }
    }
    let glyphs = document.querySelectorAll("i"); //Глифы для экрана выбора сторон
    for(let i = 0; i < glyphs.length ; i++){
        glyphs[i].addEventListener("mouseover", sideCharAnim);
        glyphs[i].addEventListener("mouseout", sideCharAnimStop);
        glyphs[i].addEventListener("click", chooseScr)
    }
    function sideCharAnim(){ //Анимация появления персонажей при наведении на глиф стороны
        let identSide = this.classList
        for(let j = 0; j < identSide.length; j++){
            if(identSide[j] == "fa-jedi-order"){
                let jedi = document.querySelector(".cal");
                jedi.classList.remove("hide");
            } else if(identSide[j] == "fa-sith"){
                let sith = document.querySelector(".secSis");
                sith.classList.remove("hide");
            }
        }
    }
    function sideCharAnimStop(){ //Возврат анимации в исходное положение по onmouseout
        let identSide = this.classList
        for(let j = 0; j < identSide.length; j++){
            if(identSide[j] == "fa-jedi-order"){
                let jedi = document.querySelector(".cal");
                jedi.classList.add("hide")
            } else if(identSide[j] == "fa-sith"){
                let sith = document.querySelector(".secSis");
                sith.classList.add("hide");
            }
        }
    }
    function chooseScr(){ //Выбор стороны и соответсвенное переключение цветовой схемы, если сторона не была выбрана ранее
    let scr = document.body.querySelector(".choose__scr"); //чтобы дезертировать и выбрать другую сторону надо удалить значение
    scr.classList.add("hide");                             //side из local storage
    let chooseSide = this.classList;                       //Выбор стороны сопровождается соответсвующей репликой от одного из
    for(let k = 0; k < chooseSide.length; k++){            //предводителя сторон
        if(chooseSide[k] == "fa-jedi-order"){
            side = "jedi";
            let mainBl = document.querySelector(".main");
            mainBl.classList.add("jediScheme");
            mainBl.classList.remove("hide");
            alert("Darth Vader: -You don't know the power of the dark side!"); //При выборе стороны jedi
        } else if(chooseSide[k] == "fa-sith"){
            side = "sith";
            let mainBl = document.querySelector(".main");
            mainBl.classList.add("sithScheme");
            mainBl.classList.remove("hide");
            alert("Yoda: -Do. Or do not. There is no try"); //При выборе стороны sith
        }
    }
    window.localStorage.setItem("side", side)
    }


    //-----------------------------------------------------ФУНКЦИОНАЛЬНАЯ ЧАСТЬ ГАЛЕРЕИ-------------------------------


    let viewer = document.querySelector(".main__viewer"); //Галерея в целом
    let viewerList = document.querySelector(".main__viewer_list"); //Её наполнение
    let people = "https://swapi.dev/api/people/";
    let planets = "https://swapi.dev/api/planets/";
    let ships = "https://swapi.dev/api/starships/";
    let init = {method: "GET"};
    let nextBut = document.querySelector(".fa-angle-double-right");  //Кнопка следующей страницы
    let prevBut = document.querySelector(".fa-angle-double-left");  //Кнопка предыдущей страницы
    let charBut = document.querySelector(".characters"); //Кнопка раздела Characters
    charBut.addEventListener("click", function() {parse(people, "charsCat")});
    let planetsBut = document.querySelector(".planets");              //Кнопка раздела Planets
    planetsBut.addEventListener("click", function() {parse(planets, "planetsCat")});
    let shipsBut = document.querySelector(".ships");                //Кнопка раздела Ships
    shipsBut.addEventListener("click", function() {parse(ships, "shipsCat")});
    function parse(req, bgCat){      //Функция обращения к API и сортировки полученых данных. Получает переменную со ссылкой 
        viewerList.innerHTML= " ";  //на страницу в API и название каталога с backgorund изображениями
        fetch(req, init).then((resp) =>{
            return resp.json();
        }).then((data) =>{
            viewerList.innerHTML= " ";
            let allInf = data;
            let reqArr = data.results;
            let reqArrLen = reqArr.length;
            let count = 0;
            for(count; count < reqArrLen; count += 1){  //Наполнение галереи получеными данными
               let classIn = reqArr[count].name;
               let classReady = classIn.split(" ").join(""); //Для присвоения класса, который будет соответствовать названию изображения для установки background
               viewerList.innerHTML += "<div class=list_elem>"+"<div class="+classReady+"></div>"+classIn+"</div";
               let backSet = document.querySelector("."+classReady);
               backSet.style.backgroundImage= "url(img/"+bgCat+"/"+classReady+".jpg)";//Установка background
               backSet.style.backgroundSize= "cover";
            }
            let elems = document.getElementsByClassName("list_elem"); //Получение наполнения viewerList
            let elemsLen = elems.length;
            let elemsCount = 0;
            for(elemsCount; elemsCount < elemsLen; elemsCount +=1){ //Для отображения информации по клику на персонажа
                let singleEl = elems[elemsCount];
                singleEl.addEventListener("click", function(){showInf(singleEl, reqArr)})
                
            }
            nextBut.addEventListener("click", function(){next(allInf, bgCat)});  //Присвоение события кнопкам следующей и
            prevBut.addEventListener("click", function(){prev(allInf, bgCat)}); //предыдущей страницы
        })
    }
    function next(allInf, bgCat){    //Функция кнопки следующей страницы
        req = allInf.next           //Получает и присваивает ссылку след. страницы из API
        parse(req, bgCat)          //Перезапускает функцию с новою ссылкой
    }
    function prev(allInf, bgCat){ //Функция предыдущей кнопки
        req = allInf.previous
        parse(req, bgCat)
    }
    function showInf(el, charList){ //Функция отображения информации о персонаже. Принимает элемент, на который было нажатие
        viewerList.innerHTML= " "; //и массив с персонажами
        for(let k = 0; k < charList.length; k++){   //Перебирает массив персонажей
            if(el.textContent == charList[k].name) //Сравнивает имя персонажа вписаное ранее и имя из массива. Когда совпадает- записывает запрашеваемую информацию.
            viewerList.insertAdjacentHTML("afterbegin", "<h3 class=charName>"+charList[k].name+"</h3><div class=charBirth>"+"Birth: "+charList[k].birth_year+"</div><div class=charGender>"+"Gender: "+charList[k].gender+"</div><div class=charHomeworld>"+"Homeworld: "+charList[k].homeworld+"</div>");
        }
    }
}