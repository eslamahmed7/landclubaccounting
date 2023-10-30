
let names = document.getElementById("name")
let id = document.getElementById("id")
let phone = document.getElementById("phone")
let age = document.getElementById("age")
let gender = document.getElementById("gender")
let namesport = document.getElementById("name-sport")
let Pricepermonth = document.getElementById("Price per month")
let numberofmonth = document.getElementById("number of month")
let Offer = document.getElementById("Offer")
let total = document.getElementById("total")
let submit = document.getElementById("submit")

let mood = "Create"
let tmp; 

// get total

function gettotal(){
    if(Pricepermonth.value != ""){
        let result = (+Pricepermonth.value - ((+Offer.value/100)* +Pricepermonth.value)) * +numberofmonth.value
        total.innerHTML = result + " EG";
        total.style.background = "#28a745"
        
    }else{total.innerHTML = ""
    total.style.background = "#b40808"
    }
}



// creat product

let datapro
if(localStorage.product != null){
datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        names:names.value,
        id:id.value,
        phone:phone.value,
        age:age.value,
        namesport:namesport.value,
        Pricepermonth:Pricepermonth.value,
        numberofmonth:numberofmonth.value,
        Offer:Offer.value,
        total:+total.value,
    }
    // if(mood === "Create"){
    //     if(newpro.count > 1){
    //         for(let i = 0; i < newpro.count; i++)
    //         datapro.push(newpro)
    //     }else{
    //         datapro.push(newpro)
    //     }
    // }else{
    //     datapro[  tmp  ] = newpro;
    //     mood = "Create"
    //     submit.innerHTML = "Create"
    // }
    datapro.push(newpro)
    // save localStorage
    
    localStorage.setItem("product", JSON.stringify(datapro))
    cleardata()
    showdata()
}



// clear inputs

function cleardata(){ 
    names.value = ""
    id.value = ""
    phone.value = ""
    age.value = ""
    namesport.value = ""
    Pricepermonth.value = ""
    numberofmonth.value = ""
    Offer.value = ""
    total.innerHTML = ""
}
// read

function showdata()
{
    gettotal()
    let table = ""
    for(let i = 1; i < datapro.length; i++){
        table +=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].names}</td>
            <td>${datapro[i].id}</td>
            <td>${datapro[i].phone}</td>
            <td>${datapro[i].age}</td>
            <td>${datapro[i].namesport}</td>
            <td>${datapro[i].Pricepermonth}</td>
            <td>${datapro[i].numberofmonth}</td>
            <td>${datapro[i].Offer}</td>
            <td>${datapro[i].total}</td>
            <td><button onclick="updatedata(  ${i}  )" id="update">update</button></td>
            <td><button onclick="deletedata(   ${i}   )"  id="delete">delete</button></td>
            </tr>
            `
            }
            document.getElementById("tbody").innerHTML = table
            let deleteall = document.getElementById("deleteall");
            if(datapro.length > 1){
                deleteall.innerHTML = `
                <button onclick="deleteall()">Delete All (${datapro.length})</button>
                `
}else{
    deleteall.innerHTML = ''
}
}

showdata()


// delete

function deletedata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showdata()
}

function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

// update

function updatedata(i){
    names.value = datapro[i].names
    id.value = datapro[i].id
    phone.value = datapro[i].phone
    age.value = datapro[i].age
    namesport.value = datapro[i].namesport
    Pricepermonth.value = datapro[i].Pricepermonth
    numberofmonth.value = datapro[i].numberofmonth
    Offer.value = datapro[i].Offer
    gettotal()
    submit.innerHTML = 'Update'
    mood = 'Update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search

// clean data 