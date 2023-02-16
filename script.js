const formDiv = document.getElementById("form-div");
const radios = document.getElementsByName("radio");
const uploadInput = document.getElementById("uploadInput");
const createInput = document.getElementById("createInput");
const createButton = document.getElementById("createButton");
const uploadButton = document.getElementById("uploadButton");
const bookNameInput = document.getElementById("bookNameInput");
const bookTextInput = document.getElementById("bookTextInput");
const bookFileInput = document.getElementById("bookFileInput");
const bookList = document.getElementById("bookList");
const addBookForm = document.querySelector(".form");


const formDivContent = formDiv.innerHTML; 

createInput.addEventListener("click", doCreateForm);

function doCreateForm() {
    createButton.classList.remove('hidden');
    uploadButton.classList.add('hidden');
    bookNameInput.classList.remove('hidden');
    bookTextInput.classList.remove('hidden');
    bookFileInput.classList.add('hidden');
};

uploadInput.addEventListener("click", doUploadForm);


function doUploadForm() {
    uploadButton.classList.remove('hidden');
    createButton.classList.add('hidden');                     
    bookNameInput.classList.add('hidden');
    bookTextInput.classList.add('hidden');
    bookFileInput.classList.remove('hidden');
};

const books = [];

const addBook = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value ? e.target.text.value: "" ;
    const book = {
        title: title, 
        text: text,
    }
    if (title.length > 0) {
        books.push(book);
        drawBookList(books, bookList)
    }
    addBookForm.reset()
    console.log(books)
} 

const drawBookList = (items, itemsList) => {
    console.log(items, itemsList)
    let id = -1;
    // const titlesList = document.querySelector("#bookList");
    itemsList.innerHTML = items.map((item, index) => {
        id++
        return `<div class="book-item" id="${id}">
        <p class="book-item__p">${item.title}</p>
        <button class="book-item__button edit" id="edit${index}">Ред.</button>
        <button class="book-item__button readed" id="readed${index}">Прочитана</button>
        <button class="book-item__button read" id="read${index}">Читать</button>
        <button class="book-item__button delete" id="delete${index}">x</button>
        </div>`
        
    }).join('');
   
    // deleteButton = document.querySelector(`#item${index}`);
    // deleteButton.addEventListener("click", function() {
    // console.log(this.id)
    // })
}

// bookItem.addEventListener("click", function (e) {
//     console.log(bookItem.id)
// })

bookList.addEventListener("click", function (e) {

    // const bookItem = document.querySelector(".book-item");
    // bookItem.addEventListener("click", function (e) {
    //     // bookItem.id
    //     document.querySelector(".book__name").innerText = books[bookItem.id].title;
    //     document.querySelector(".book__text").innerText = books[bookItem.id].text;
    // })

    if(e.target.closest(".delete")) {
        let closestDiv = e.target.closest(".book-item");
        let divID = closestDiv.getAttribute('id');
        books.splice(divID, 1)
        // bookList.innerHtml = "newContent";
        // delete books[divID];
        // bookList.removeChild(closestDiv);
        // closestDiv.style.display = "none";
        closestDiv.remove()
        drawBookList(books, bookList);
    }

    if(e.target.closest(".readed")) {
        // e.target.closest(".book-item").innerHTML = ""
        let closestDiv = e.target.closest(".book-item");
        if (closestDiv.classList.contains("readedBook")) {
            closestDiv.classList.remove("readedBook");
            e.target.closest(".readed").classList.remove("readedButton");
            e.target.closest(".readed").innerText = "Прочитана"
        } 
        else {
            closestDiv.classList.add("readedBook")
            e.target.closest(".readed").classList.add("readedButton");
            e.target.closest(".readed").innerText = "Прочитал"
        } 
        
    }

    if(e.target.closest(".read") || e.target.closest(".book-item__p")) {
       let closestDiv = e.target.closest(".book-item");
       let divID = closestDiv.getAttribute('id');
       document.querySelector(".book__name").innerText = books[divID].title;
       document.querySelector(".book__text").innerText = books[divID].text;
    }
})

//По клику на кнопку Ред. 
//По клику на кнопку прочитано изменить inner.text у кнопки и closest("div") изменить style.background
//По клику на кнопку Читать нужно изменить document.querySelector(".book__name").innerText на title, который будет взят из массива по индексу и 
//document.querySelector(".book__name").innerText на text тем же образом
//По клику на кнопку delete удалить элемент массива, в котором эта кнопка находится и убрать его из localStorage

addBookForm.addEventListener("submit", addBook)



function saveBookInLocalStorage() {
    localStorage.setItem(bookNameInput.value, bookTextInput.value);
    // bookArr.push({name: bookNameInput.value, text: bookTextInput.value})
    bookNameInput.value = ""
    bookTextInput.value = ""
    // document.getElementById("itemDiv").addEventListener('click', )
}

function showBook() {
    
}

// createButton.addEventListener("click", function(e) {
//     e.preventDefault();
//     saveBookInLocalStorage();
//     // addBook();
// });




// bookList.innerHTML +=`<div class="book-item id="itemDiv">
// <p class="book-item__p">- ${bookNameInput.value}</p>
// <button class="book-item__button">Ред.</button>
// <button class="book-item__button">Прочитана</button>
// <button class="book-item__button">Читать</button>
// <button class="book-item__button">x</button>
// </div>`







// uploadButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     sendRequest();
// })

// function sendRequest() {
//     console.log(bookFileInput.value)
//     return fetch("https://apiinterns.osora.ru/", {
//         method: "POST",
//         body: JSON.stringify(bookFileInput.value),
//         headers: {
//             "Content-Type": "application/json",
//             "login": "Dev",
//             "password": "qdprivate" 
//         }
//     }).then(response => {
//         if (response.ok) {
//             return response.json()
//         }
//     })
// }
// let password = 'qdprivate';
// headers.append('Content-Type', 'text/json');
// let base64 = import('base-64');


// let login =  btoa("Dev:qdprivate");

// let headers = new Headers();

// headers.append('Authorization', `Basic ${login}`);

// function sendRequest() {
//     return fetch("https://apiinterns.osora.ru/", {method: 'POST',
//     headers: {
//         "Access-Control-Allow-Origin": `Basic ${login}`
//     },
// })
//     .then(responce => responce.json())
//     .then(json => console.log(json))
// }

// sendRequest();
