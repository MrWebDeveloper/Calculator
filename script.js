// Variebles
const n0 = document.getElementById("n0");
const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const n4 = document.getElementById("n4");
const n5 = document.getElementById("n5");
const n6 = document.getElementById("n6");
const n7 = document.getElementById("n7");
const n8 = document.getElementById("n8");
const n9 = document.getElementById("n9");
const dot = document.getElementById("dot");
const sign_num = document.getElementById("sign");

const clear = document.getElementById("clear");
const power = document.getElementById("power");
const per = document.getElementById("per");
const del = document.getElementById("del");

const divi = document.getElementById("divi");
const mul = document.getElementById("mul");
const sub = document.getElementById("sub");
const sum = document.getElementById("sum");
const equal = document.getElementById("equal");

const light = document.getElementById("th-light");
const dark = document.getElementById("th-dark");
const neon = document.getElementById("th-neon");
const his = document.getElementById("history");

const num_display = document.getElementById("calculator");
const result_display = document.getElementById("result");

let switch_num = false;
let math_sign;
let num1;
let num2;



// Functions
function changeTheme(userChoice){
    let theme;
    if(typeof userChoice === "string"){
        theme = userChoice;
        localStorage.setItem("online_cal_theme" , userChoice);
    }else{
        theme = localStorage.getItem("online_cal_theme") || "light";
    }
    light.classList.remove("selected");
    dark.classList.remove("selected");
    neon.classList.remove("selected");
    switch(theme){
        case "light":
            document.documentElement.className = "light";
            light.className = "selected";
            localStorage.setItem("online_cal_theme" , "light");
        break;
        case "dark":
            document.documentElement.className = "dark";
            dark.className = "selected";
            localStorage.setItem("online_cal_theme" , "dark");
        break;
        case "neon":
            document.documentElement.className = "neon";
            neon.className = "selected";
            localStorage.setItem("online_cal_theme" , "neon");
        break;
    }
}


function typing(e){
    if(e !== "just show!"){
        if(switch_num){
            if(e.target.textContent === "." ){
                if(num2.includes(".") !== true){
                    num2 === undefined ? num2 = e.target.textContent: num2 = num2 + e.target.textContent;
                }
            }else{
                num2 === undefined ? num2 = e.target.textContent: num2 = num2 + e.target.textContent;
            }
        }else{
            if(e.target.textContent === "." ){
                if(num1.includes(".") !== true){
                    num1 === undefined ? num1 = e.target.textContent: num1 = num1 + e.target.textContent;
                }
            }else{
                num1 === undefined ? num1 = e.target.textContent: num1 = num1 + e.target.textContent;
            };
        }; 
    };
    
    if (num2 === undefined && math_sign === undefined){
        num_display.textContent = num1;
    }else if(num2 === undefined){
        num_display.textContent = `${num1} ${math_sign}`;
    }else{
        num_display.textContent = `${num1} ${math_sign} ${num2}`;
        result(Number(num1), math_sign , Number(num2));
    }
    
}

function addSign(e){
    if(num2 !== undefined){equal_is()};
    if(num1 !== undefined){
    switch(e.target.textContent){
        case "÷":
            math_sign = "÷";
            switch_num = true;
            typing("just show!");
        break;
        case "✖":
            math_sign = "×";
            switch_num = true;
            typing("just show!");
        break;
        case "−":
            math_sign = "−";
            switch_num = true;
            typing("just show!");
        break;
        case "✚":
            math_sign = "+";
            switch_num = true;
            typing("just show!");
        break;
        case "%":
            math_sign = "%";
            switch_num = true;
            typing("just show!");
        break;
        case "Xx":
            math_sign = "^";
            switch_num = true;
            typing("just show!");
        break;
    }
    }
}

function equal_is(){
    if(num2 !== undefined && result_display.textContent !== "No ability to calculate!"){
        ls.setHistory(`${num_display.textContent} = ${result_display.textContent}`);
        num1 = result_display.textContent;
        num2 = undefined;
        math_sign = undefined;
        switch_num = false;
        result_display.textContent = "";
        typing("just show!");

    }
}

function result(num1 , sign , num2){
    let res;
    switch(sign){
        case "÷":
            res = num1/num2;
        break;
        case "×":
            res = num1*num2;
        break;
        case "−":
            res = num1-num2;
        break;
        case "+":
            res = num1+num2;
        break;
        case "%":
            res = (num2/num1)*100;
        break;
        case "^":
            res = num1**num2;
        break;
    }
    if(res > Number.MAX_SAFE_INTEGER || res < Number.MIN_SAFE_INTEGER){res = "No ability to calculate!";};
    if(res > 0 && res < 0.000001){res = "No ability to calculate!"};
    if(res < 0 && res > -0.000001){res = "No ability to calculate!"};
    result_display.textContent = res;
}

function remove(e){

    if(e.target.textContent === "C"){
        num1 = undefined; num2 = undefined; math_sign = undefined;
        num_display.textContent = "";
        result_display.textContent = "";
        switch_num = false;

    }else{
        if(num2 !== undefined){
            num2 = num2.slice(0 , -1);
            if(num2.length === 0)
            {num2 = undefined; result_display.textContent = "";
            }else if(num2.length === 1 && num2.includes("-") === true){
                num2 = undefined; result_display.textContent = "";
            }
            typing("just show!");
        }else{
            if(math_sign !== undefined){
                math_sign = undefined;
                switch_num = false;
                typing("just show!");
            }else if(num1 !== undefined){
                num1 = num1.slice(0 , -1);
                if(num1.length === 0){num1 = undefined}
                else if(num1.length === 1 && num1.includes("-") === true){num1 = undefined}
                typing("just show!");
            }
        } 
    }
}

function posAndNeg(){

    if(math_sign === undefined && num1 !== undefined){
        if(num1 > 0 && num1 < 0.000001){
            num1 = Number(-num1).toFixed(num1.length - 2);
        }else if(num1 < 0 && num1 > -0.000001){
            num1 = Number(-num1).toFixed(num1.length - 3);
        }else{
            num1 = JSON.stringify(-Number(num1));
        }
        typing("just show!");

    }else if(num2 !== undefined){
        if(num2 > 0 && num2 < 0.000001){
            num2 = Number(-num2).toFixed(num2.length - 2);
        }else if(num2 < 0 && num2 > -0.000001){
            num2 = Number(-num2).toFixed(num2.length - 3);
        }else{
            num2 = JSON.stringify(-Number(num2));
        }
        typing("just show!");
    }
}

const ls = {
    getFromLs: ()=>{
        let dataArray ;
        const dataString = localStorage.getItem('calculator_history');
        if (dataString === null){dataArray = ["History is empty"]}
        else {dataArray = JSON.parse(dataString)};
        return dataArray;
    },
    
    setHistory: item => {
        let dataArray = ls.getFromLs();
        if(dataArray.includes("History is empty")){dataArray = []}
        if(dataArray.length > 14){dataArray.shift();};
        dataArray.push(item);
        localStorage.setItem("calculator_history" , JSON.stringify(dataArray));
    },

    showHistory: () => {
        const backHid = document.createElement("div");
        backHid.className = "backHid"; document.body.append(backHid);
        const hisPage = document.createElement("div");
        hisPage.className = "hisPage"; document.body.append(hisPage);
        const list = document.createElement("ul");
        list.className = "list"; hisPage.append(list);
       
        let dataArray = ls.getFromLs();
        if(!(dataArray.includes("History is empty"))){
            const hisDelete = document.createElement("button");
            hisDelete.className = "hisDelete"; hisPage.append(hisDelete);
            hisDelete.innerHTML = "Clear History!";
            hisDelete.addEventListener("click" , ()=> {
                dataArray = ["History is empty"];
                localStorage.setItem("calculator_history" , JSON.stringify(dataArray));
            });
        };
        dataArray.map(item =>{
            const li = document.createElement("li");
            li.innerHTML = item;
            list.append(li);
        });
        backHid.addEventListener("click" , ()=> {backHid.remove();hisPage.remove();});
        hisPage.addEventListener("click" , ()=> {backHid.remove();hisPage.remove();});
    }
    
}


// Events
light.addEventListener("click" , ()=> changeTheme("light"));
dark.addEventListener("click" , ()=> changeTheme("dark"));
neon.addEventListener("click" , ()=> changeTheme("neon"));
his.addEventListener("click" , ls.showHistory);

sign_num.addEventListener("click" , posAndNeg);
dot.addEventListener("click" , typing);
n0.addEventListener("click" , typing);
n1.addEventListener("click" , typing);
n2.addEventListener("click" , typing);
n3.addEventListener("click" , typing);
n4.addEventListener("click" , typing);
n5.addEventListener("click" , typing);
n6.addEventListener("click" , typing);
n7.addEventListener("click" , typing);
n8.addEventListener("click" , typing);
n9.addEventListener("click" , typing);

divi.addEventListener("click" , addSign);
mul.addEventListener("click" , addSign);
sub.addEventListener("click" , addSign);
sum.addEventListener("click" , addSign);
per.addEventListener("click" , addSign);
power.addEventListener("click" , addSign);

clear.addEventListener("click" , remove);
del.addEventListener("click" , remove);
equal.addEventListener("click" , equal_is);

document.addEventListener("DOMContentLoaded" , changeTheme);