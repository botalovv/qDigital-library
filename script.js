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
const favoriteList = document.querySelector("#favoriteList");
const dropdown = document.querySelector(".dropdown")

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
        isReaded: false,
    }
    if (title.length > 0) {
        books.push(book);
        drawBookList(books, bookList)
    }
    addBookForm.reset()
    console.log(books)
} 

addBookForm.addEventListener("submit", addBook);

const drawBookList = (items, itemsList) => {
    console.log(items, itemsList)
    let id = -1;
    // const titlesList = document.querySelector("#bookList");
    itemsList.innerHTML = items.map((item, index) => {
        localStorage.setItem(`book${index}`, JSON.stringify(item))
        id++
        return `<div class="book-item" id="${id}" draggable="true">
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
        localStorage.removeItem(`book${divID}`)
    }
    
    if(e.target.closest(".readed")) {
        // e.target.closest(".book-item").innerHTML = ""
        let closestDiv = e.target.closest(".book-item");
        let divID = closestDiv.getAttribute('id');
        if (!books[divID].isReaded) {
            books[divID].isReaded = true
            closestDiv.classList.add("readedBook")
            e.target.closest(".readed").classList.add("readedButton");
            e.target.closest(".readed").innerText = "Прочитал"
        } 
        else {
            closestDiv.classList.remove("readedBook");
            e.target.closest(".readed").classList.remove("readedButton");
            e.target.closest(".readed").innerText = "Прочитана";
            books[divID].isReaded = false
        } 
        
    }

    if(e.target.closest(".read") || e.target.closest(".book-item__p")) {
       let closestDiv = e.target.closest(".book-item");
       let divID = closestDiv.getAttribute('id');
       document.querySelector(".book__name").innerText = books[divID].title;
       document.querySelector(".book__text").innerText = books[divID].text;
    }
})

//При перетаскивании в drag and drop area клонировать в див избранных книг элемент, который мы перетаскивали

bookList.addEventListener("dragstart", function (e) {
    let closestDiv = e.target.closest(".book-item");
    
    closestDiv.addEventListener("drop", function (e) {
        if (e.target.closest(".dropdown")) {
            // favoriteList.innerHTML += closestDiv.cloneNode(true)
            console.log()
        }
    })
    // if (e.target.closest(".book-item")) {
    //    setTimeout(() => {
    //         closestDiv.classList.add("hidden");
    //     }, 0)
    // }
        
    
    
})

bookList.addEventListener("dragend", function (e) {
    
})

dropdown.addEventListener("dragenter", function (e) {
    console.log(e.target.value)
})

dropdown.addEventListener("dragover", function (e) {
    e.preventDefault()
})

dropdown.addEventListener("drop", function (e) {
    if(e.target.closest(".dropdown")) {
        favoriteList.cloneNode(e.dataTransfer)
        console.log(e.dataTransfer.getData)
    }
})





// function saveBookInLocalStorage() {
//     localStorage.setItem(bookNameInput.value, bookTextInput.value);
//     bookArr.push({name: bookNameInput.value, text: bookTextInput.value})
//     bookNameInput.value = ""
//     bookTextInput.value = ""
//     document.getElementById("itemDiv").addEventListener('click', )
// }

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
