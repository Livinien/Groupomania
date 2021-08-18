



// CODE 1 //

// let form = document.getElementById("form");


// form.addEventListener("submit", (e) => {

//     e.preventDefault();
    
//     const article = {

//         title: document.getElementById("title").value,
//         content: document.getElementById("content").value,
        
//     }

//     console.log(article);

    
// })




    // CODE 2 //


    // SIGNUP //

    // const postForm = document.getElementById("postForm");


    // postForm.addEventListener("submit", async (e) => {
    //     e.preventDefault()
    
    //     const post = { 
    
    //         title: document.getElementById("title").value, 
    //         content: document.getElementById("content").value, 
            
    //     } 
    
    //     console.log(post);
        
        
    //     let isValidTitle = false
    //     let isValidContent = false
        
        
        

        
    //         // FIRSTNAME //
    
        
    //     if(post.title) {
    
    //     if(post.title.length === 0) {
    //         console.log(post.title);
            
    
    //     }
            
    //     if(post.title.length < 3) {
    //         console.log(post.title);
            
    
    //     } else {
    //         isValidTitle = true
    //         console.log(isValidTitle);
    //     } 
    
    // } 
    
    
    //         // LASTNAME //
    
        
    //     if(post.content.length === 0) {
    //         console.log(post.content);
            
    //     }
    
    //     if(post.content) {
    
            
    //     if(post.content.length < 3) {
    //         console.log(post.content);

    
    //     } else {
    
    //         isValidContent = true
    //         console.log(isValidContent);
    
    //     }
    
    // }
    
    

    
    //         // CONFIRMER LA REQUÊTE //
    
    //     if(isValidTitle && isValidContent) {
    
    //         const json = post(post)
    //         console.log(json);
    
    //     }
    
    
    // });
    
    
    




// CODE 3 //

var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["title"] = document.getElementById("title").value;
    formData["content"] = document.getElementById("content").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("post").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.title;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.content;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `
    
    
        <h2 class="card-title">${data.title}</h2>
        <p class="card-text">${data.content}</p>
        <button onClick="onEdit(this)" type="button" class="btn btn-primary">Modifier</button>
        <button onClick="onDelete(this)" type="button" class="btn btn-danger">Supprimer</button>
    
        
    `;
    
}

function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("title").value = selectedRow.cells[0].innerHTML;
    document.getElementById("content").value = selectedRow.cells[1].innerHTML;
    
}


function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.title;
    selectedRow.cells[1].innerHTML = formData.content;
    
}

function onDelete(td) {
    if (confirm('Êtes-vous sur de vouloir supprimer le post ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("post").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("title").value == "") {
        isValid = false;
        document.getElementById("titleValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("titleValidationError").classList.contains("hide"))
            document.getElementById("titleValidationError").classList.add("hide");
    }
    return isValid;
}




// `<div class="card"">
//         <div class="card-body">
//         <h2 class="card-title">${data.title}</h2>
//         <p class="card-text">${data.content}</p>
//         <button onClick="onEdit(this)" type="button" class="btn btn-primary">Modifier</button>
//         <button onClick="onDelete(this)" type="button" class="btn btn-danger">Supprimer</button>
//         </div>
//     </div>`;