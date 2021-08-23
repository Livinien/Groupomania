



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

// let selectedRow = null

// function onFormSubmit() {
    
//     let formData = readFormData();
//     if (selectedRow == null)
//         insertNewRecord(formData);
//     else
//         updateRecord(formData);
//     resetForm();
// }


// function readFormData() {
//     let formData = {};
//     formData["title"] = document.getElementById("title").value;
//     formData["content"] = document.getElementById("content").value;
//     return formData;
// }

// function insertNewRecord(data) {
//     let table = document.getElementById("post").getElementsByTagName('tbody')[0];
//     console.log(data);
//     let newRow = table.insertRow(table.length);
//     cell1 = newRow.insertCell(0);
    
//     cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.content;
//     cell3 = newRow.insertCell(2);
//     cell3.innerHTML = `
       
//         <h2 class="card-title">${data.title}</h2>
//         <p class="card-text"></p>
//         <br>
//         <br>
//         <button onClick="onEdit(this)" type="button" class="btn btn-primary">Modifier</button> &nbsp;&nbsp;
//         <button onClick="onDelete(this)" type="button" class="btn btn-danger">Supprimer</button>
        

//         <style>
            

//         </style>
        
//     `;
    
// }

// function resetForm() {
//     document.getElementById("title").value = "";
//     document.getElementById("content").value = "";
    
//     selectedRow = null;
// }

// function onEdit(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("title").value = selectedRow.cells[0].innerHTML;
//     document.getElementById("content").value = selectedRow.cells[1].innerHTML;
    
// }


// function updateRecord(formData) {
//     selectedRow.cells[0].innerHTML = formData.title;
//     selectedRow.cells[1].innerHTML = formData.content;
    
// }

// function onDelete(td) {
//     if (confirm('Êtes-vous sur de vouloir supprimer le post ?')) {
//         row = td.parentElement.parentElement;
//         document.getElementById("post").deleteRow(row.rowIndex);
//         resetForm();
//     }
// }


// SUPPRIMER LE TOKEN UNE FOIS DECONNECTER //

const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {

    localStorage.removeItem("token")
    window.location.href = "index.html";

});



const form = document.getElementById("myForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const postToSend = { title, content };
    const post = await sendPost(postToSend);
    
   
    
});



// CREER UN POST //

function displayPost(post) {

    const postHtml = `
    
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button id="update${post.id}">Modifier</button>
        <button id="delete${post.id}">Supprimer</button>
        
        `;

    const displayPost = document.getElementById("displayPost");
    displayPost.insertAdjacentHTML("beforeend", postHtml);


}







const token = localStorage.getItem("token");
if(!token) {

    window.location.href = "index.html"

}












          





