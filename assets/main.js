let side
window.onload= start();
function start(){
    if(localStorage.side){
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
    let glyphs = document.querySelectorAll("i");
    for(let i = 0; i < glyphs.length ; i++){
        glyphs[i].addEventListener("mouseover", sideCharAnim);
        glyphs[i].addEventListener("mouseout", sideCharAnimStop);
        glyphs[i].addEventListener("click", chooseScr)
    }
    function sideCharAnim(){
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
    function sideCharAnimStop(){
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
    function chooseScr(){
    let scr = document.body.querySelector(".choose__scr");
    scr.classList.add("hide");
    let chooseSide = this.classList;
    for(let k = 0; k < chooseSide.length; k++){
        if(chooseSide[k] == "fa-jedi-order"){
            side = "jedi";
            let mainBl = document.querySelector(".main");
            mainBl.classList.add("jediScheme");
            mainBl.classList.remove("hide");
            alert("Darth Vader: -You don't know the power of the dark side!");
        } else if(chooseSide[k] == "fa-sith"){
            side = "sith";
            let mainBl = document.querySelector(".main");
            mainBl.classList.add("sithScheme");
            mainBl.classList.remove("hide");
            alert("Yoda: -Do. Or do not. There is no try");
        }
    }
    window.localStorage.setItem("side", side)
    }
    let uiButs = document.querySelectorAll(".main__nav_item");
    let chars = {};
    let viewer = document.querySelector(".main__viewer");
    let viewerList = document.querySelector(".main__viewer_list");
    let people = "https://swapi.dev/api/people/";
    let movies = "https://swapi.dev/api/films/";
    let planets = "https://swapi.dev/api/planets/";
    let ships = "https://swapi.dev/api/starships/";
    let init = {method: "GET"};
    infParse()
    function infParse(){
    viewerList.innerHTML= " ";
    for(let z = 0; z < uiButs.length; z++){
        uiButs[z].addEventListener("click", identReq);
        function identReq(){
            viewerList.innerHTML= " "
            switch (uiButs[z].textContent) {
                case "characters":
                    viewerList.innerHTML= " "
                   fetch(people, init).then((resp) =>{
                       return resp.json();
                   }).then((data) => {
                       viewerList.innerHTML= " ";
                       for(let l = 0; l < data.results.length; l++){
                           let classIn = data.results[l].name;
                           let classSymb = classIn.split(" ");
                           let classReady = classSymb.join("");
                           viewerList.innerHTML += "<div class=list_elem>"+"<div class="+classReady+"></div>"+data.results[l].name+"</div";
                           let backSet = document.querySelector("."+classReady)
                           backSet.style.backgroundImage= "url(img/chars/"+classReady+".jpg)";
                           backSet.style.backgroundSize= "cover";
                           let elems = document.getElementsByClassName("list_elem");
                           for(let c = 0; c < elems.length; c++){
                           elems[c].addEventListener("click", modal)
                           }
                           function modal(){
                           let hideElem = document.getElementsByClassName("list_elem");
                           for(let b = 0; b < hideElem.length; b++){
                               hideElem[b].classList.add("hide");
                           }
                           for(let q = 0; q < data.results.length; q++){
                               if(data.results[q].name == this.textContent){
                                viewer.insertAdjacentHTML("afterbegin", "<h3>"+data.results[q].name+"</h3><div>"+"Birth: "+data.results[q].birth_year+"</div><div>"+"Gender: "+data.results[q].gender+"</div><div>"+"Homeworld: "+data.results[q].homeworld+"</div>");
                               }
                           }
                       }
                       }
                       people = data.next;
                       console.log(data);
                   });
                   let nextPers = document.querySelector(".fa-angle-double-right");
                   nextPers.addEventListener("click", nextCha);
                   function nextCha(){
                       viewerList.innerHTML= " ";
                       identReq();
                       return
                   }
                    break;
                case "movies":
                    viewerList.innerHTML= " "
                    fetch(movies, init).then((resp) =>{
                        return resp.json();
                    }).then((data) => {
                        for(let l = 0; l < data.results.length; l++){
                            let classIn = data.results[l].title;
                            let classSymb = classIn.split(" ");
                            let classReady = classSymb.join("");
                            viewerList.insertAdjacentHTML("beforeend", "<div class=list_elem>"+"<div class="+classReady+"></div>"+data.results[l].title+"</div");
                            let backSet = document.querySelector("."+classReady)
                            backSet.style.backgroundImage= "url(img/movies/"+classReady+".jpg)";
                            backSet.style.backgroundSize= "cover";
                        }
                        console.log(data.results);
                    })
                     break;
                case "planets":
                    viewerList.innerHTML= " ";
                   fetch(planets, init).then((resp) =>{
                       return resp.json();
                   }).then((data) => {
                       viewerList.innerHTML= " ";
                       for(let l = 0; l < data.results.length; l++){
                           let classIn = data.results[l].name;
                           let classSymb = classIn.split(" ");
                           let classReady = classSymb.join("");
                           viewerList.insertAdjacentHTML("beforeend", "<div class=list_elem>"+"<div class="+classReady+"></div>"+data.results[l].name+"</div");
                           let backSet = document.querySelector("."+classReady)
                           backSet.style.backgroundImage= "url(img/planets/"+classReady+".jpg)";
                           backSet.style.backgroundSize= "cover";
                       }
                       planets = data.next
                       console.log(data.results);
                   });
                   let nextPla = document.querySelector(".next__but");
                   nextPla.addEventListener("click", nextInh);
                   function nextInh(){
                       viewerList.innerHTML= " ";
                       identReq();
                       return
                   }
                    break;
                case "ships":
                    viewerList.innerHTML= " "
                   fetch(ships, init).then((resp) =>{
                       return resp.json();
                   }).then((data) => {
                       viewerList.innerHTML= " ";
                       for(let l = 0; l < data.results.length; l++){
                           let classIn = data.results[l].name;
                           let classSymb = classIn.split(" ");
                           let classReady = classSymb.join("");
                           viewerList.insertAdjacentHTML("beforeend", "<div class=list_elem>"+"<div class="+classReady+"></div>"+data.results[l].name+"</div");
                           let backSet = document.querySelector("."+classReady)
                           backSet.style.backgroundImage= "url(img/ships/"+classReady+".jpg)";
                           backSet.style.backgroundSize= "cover";
                       }
                       ships = data.next
                       console.log(data.results)
                   });
                   let nextShips = document.querySelector(".next__but");
                   nextShips.addEventListener("click", nextCor);
                   function nextCor(){
                       viewerList.innerHTML= " ";
                       identReq();
                       return
                   }
                    break;
            }
        }
    }
    }
}