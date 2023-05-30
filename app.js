const buttonNumber = document.querySelectorAll(".number")
const buttonOperator = document.querySelectorAll(".operator")
const displayValueOld= document.getElementById("value-old")
const displayValueNew= document.getElementById("value-new")

const inputColor1= document.getElementById("color1")
const inputColor2= document.getElementById("color2")
const inputColor3= document.getElementById("color3")

const container= document.getElementById("container")
const calculatorStyle= document.getElementById("calculator")
const buttonStyle= document.querySelectorAll("button")

console.log(buttonStyle)
console.log(calculatorStyle)

inputColor1.addEventListener("input", ()=>{
    document.body.style.backgroundColor= "#2c2c5f"
    buttonStyle.forEach(button => {
        button.style.cssText =  "background-Color: rgb(79 110 173); box-shadow: 10px 5px 10px 5px #00000040, -10px -5px 15px 3px #16171629"
    });
    calculatorStyle.style.backgroundColor= "rgb(60 60 140)"
})


inputColor2.addEventListener("input", ()=>{
    document.body.style.backgroundColor= "#eaeaea"
    buttonStyle.forEach(button => {
        button.style.cssText =  "background-Color: #00000033; box-shadow: rgb(0 0 0 / 8%) 10px 5px 10px 5px, rgb(22 23 22 / 4%) -10px -5px 15px 3px"
    });
    calculatorStyle.style.backgroundColor= "rgb(209 209 223)"
})

inputColor3.addEventListener("input", ()=>{
    document.body.style.backgroundColor= "cadetblue"
    buttonStyle.forEach(button => {
        button.style.cssText =  "background-Color: rgb(66, 190, 194); box-shadow: 10px 5px 10px 5px #00000040, -10px -5px 15px 3px #a5e2d321"
    });
    calculatorStyle.style.cssText= "background-color: rgb(66, 190, 194); box-shadow: 15px 10px 0px 5px #00000033"
})


class Calculadora{
    suma(num1, num2){
        return parseFloat(num1+num2) ;
    }

    resta(num1, num2){
        return num1-num2;
    }

    multiplicacion(num1, num2){
        return num1*num2;
    }

    division(num1, num2){
        return num1/num2;
    }
}

class Display{
    constructor(displayValueOld, displayValueNew){
        this.displayValueOld= displayValueOld;
        this.displayValueNew= displayValueNew;
        this.calculadora=new Calculadora();
        this.operator= undefined;
        this.valueNew="";
        this.valueOld="";
        this.signos={
            suma: "+",
            resta: "-",
            multiplicacion: "*",
            division: "%"
        }
    }

    delete(){
        this.valueNew= this.valueNew.toString().slice(0,-1);
        this.mostrarNew();
    }

    deleteAll(){
        this.valueNew= "";
        this.valueOld= "";
        this.operator= undefined;
        this.mostrarNew();
    }


    addNumber(numero){
        if(numero==="."&& this.valueNew.includes(".")) return;
        this.valueNew=this.valueNew.toString() + numero.toString();
        this.mostrarNew();
    }
    
    mostrarNew(){
        this.displayValueNew.textContent=this.valueNew;
        this.displayValueOld.textContent=`${this.valueOld} ${this.signos[this.operator] || ""} ` ;
    }

    calcular(){
        const newValue = parseFloat(this.valueNew);
        const oldValue = parseFloat(this.valueOld);

        if(isNaN(newValue) || isNaN(oldValue)) return;

        this.valueNew = this.calculadora[this.operator](oldValue, newValue);
    }

    operationType(value){
        this.operator !== "igual" && this.calcular();
        this.operator=value;
        this.valueOld= this.valueNew || this.valueOld
        this.valueNew= ""; 
        this.mostrarNew();
    }
}

let display= new Display(displayValueOld, displayValueNew)

buttonNumber.forEach(number=>{
    number.addEventListener("click", ()=> display.addNumber(number.innerHTML))
})

buttonOperator.forEach(operator=>{
    operator.addEventListener("click", ()=> display.operationType(operator.value))
})


/*buttonNumber.forEach(buton => {
    buton.addEventListener("click", ()=>{
        displaynew(buton.textContent)
        if(operator){
        valueOld+=buton.textContent;
        }else{
        valueNew+=buton.textContent;
        }
        console.log("Valor viejo:"+valueOld)
        console.log("Valor nuevo:"+valueNew)
    })
});



function displaynew(number){
   displayValueNew.innerHTML+= number; 
}

buttonOperator.forEach(element => {
    element.addEventListener("click", ()=>{
        operator= element.textContent
        displayOld(valueNew-0)
        displayValueNew.innerHTML= ""
    })
});

function displayOld(valueNew) {
    displayValueOld.innerHTML= valueNew
}

function calcular(){
    if(operator=="+"){
        resultado=calculadora.suma(valueOld, valueNew)
        displayValueNew.innerHTML= resultado
        console.log(resultado)
    }
}*/