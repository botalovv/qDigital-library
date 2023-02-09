const formDiv = document.getElementById("form-div");
const radios = document.getElementsByName("radio");
const uploadInput = document.getElementById("uploadInput");
const createInput = document.getElementById("createInput");
const createButton = document.getElementById("createButton");
const uploadButton = document.getElementById("uploadButton");
const bookNameInput = document.getElementById("bookNameInput");
const bookTextInput = document.getElementById("bookTextInput");
const bookFileInput = document.getElementById("bookFileInput");
const postURL = "https://apiinterns.osora.ru/"

const formDivContent = formDiv.innerHTML; 

createInput.addEventListener("click", doCreateForm);

function doCreateForm() {
    formDiv.innerHTML = `<input id="bookNameInput" type="text" placeholder="Заголовок" class="form-input header-input">
                         <input id="bookTextInput" type="text" placeholder="Описание" class="form-input description-input">
                         <button id="createButton" class="submit-button form__p hidden">Отправить/Сохранить</button>`
    document.getElementById("createButton").classList.remove('hidden');                     
};

uploadInput.addEventListener("click", doUploadForm);


function doUploadForm() {
    formDiv.innerHTML = `<input id="bookFileInput" type="file" accept=".txt" class="input-file">
                         <button type="button" id="uploadButton" class="submit-button form__p hidden">Отправить/Сохранить</button>`
    document.getElementById("uploadButton").classList.remove('hidden');                     
                         
};
console.log(createButton)
// createButton.addEventListener("click", )

uploadButton.addEventListener("click", sendRequest)

function sendRequest() {
    const headers = {
        "Content-Type": "application/json",
        "login": "Dev",
        "password": "qdprivate" 
    }

    return fetch("https://apiinterns.osora.ru/", {
        method: "POST",
        body: JSON.stringify(bookFileInput.value),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
}