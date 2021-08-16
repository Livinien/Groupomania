

// let form = document.getElementById("form");


// form.addEventListener("submit", (e) => {

//     e.preventDefault();
    
//     const article = {

//         title: document.getElementById("title").value,
//         content: document.getElementById("content").value,
        
//     }

//     console.log(article);

    
// })



    // SIGNUP //

    const postForm = document.getElementById("postForm");


    postForm.addEventListener("submit", async (e) => {
        e.preventDefault()
    
        const post = { 
    
            title: document.getElementById("title").value, 
            content: document.getElementById("content").value, 
            
        } 
    
        console.log(post);
        
        
        let isValidTitle = false
        let isValidContent = false
        
        
        

        
            // FIRSTNAME //
    
        
        if(post.title) {
    
        if(post.title.length === 0) {
            console.log(post.title);
            
    
        }
            
        if(post.title.length < 3) {
            console.log(post.title);
            
    
        } else {
            isValidTitle = true
            console.log(isValidTitle);
        } 
    
    } 
    
    
            // LASTNAME //
    
        
        if(post.content.length === 0) {
            console.log(post.content);
            
        }
    
        if(post.content) {
    
            
        if(post.content.length < 3) {
            console.log(post.content);

    
        } else {
    
            isValidContent = true
            console.log(isValidContent);
    
        }
    
    }
    
    
    
    
            // CONFIRMER LA REQUÊTE //
    
        if(isValidTitle && isValidContent) {
    
            const json = post(post)
            console.log(json);
    
        }
    
    
    });
    
    
    
    
    





// var post;
// var posts = [];
// var posts2;
// var userPost = document.getElementById("post");


// document.getElementById("postForm").addEventListener("submit", (e) => {

//     e.preventDefault(); 

//     Create();
//     Read();
//     document.getElementById("form").reset();

// });


// function Create() {

//     let storage = JSON.parse(localStorage.getItem("title"))
//     post = document.getElementById('title').value;

//     if(post == '') {

//         alert('Ecrit le nom de ton post');

//     } else {
    
//         if (storage == null) {

//             posts.push(post);
//             localStorage.setItem("posts", JSON.stringify(posts));

//         } else {

//             posts = JSON.parse(localStorage.getItem("posts"));
//             posts.push(post);
//             localStorage.setItem("posts", JSON.stringify(posts));


//         }
//     }

// }

// function Read() {

//     userPost.innerHTML = '';
//     posts2 = JSON.parse(localStorage.getItem("posts"));

//     if(posts2 == null) {

//         userPost.innerHTML+= `
        
//         <div class="card" style="width: 18rem;">
//             <div class="card-body">
//                 <h5 class="card-title">Card title</h5>
//                 <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                 <a href="#" class="card-link">Card link</a>
//                 <a href="#" class="card-link">Another link</a>
//             </div>
//         </div>
        
//         `

//     } else {

//         for(var i = 0; i < posts2.length; i++) {

//             userPost.innerHTML+= `
        
//             <div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                     <h5 class="card-title">${i+1}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${posts2[i]}</h6>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                     <button Onclick="Delete(${i})" type="button" class="btn btn-primary">Modifier</button>
//                     <button Onclick="Delete(${i})" type="button" class="btn btn-danger">Supprimer</button>
                    
//                 </div>
//             </div>
//             `

//         }

//     }

// }


// function Update(i3) {

//     let posts4 = JSON.parse(localStorage.getItem("posts"));
//     userPost.innerHTML = '';
//     userPost.innerHTML += `
    
//     <div class="card" style="width: 18rem;">
//             <div class="card-body">
//                 <h5 class="card-title">Card title</h5>
//                 <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                 <a href="#" class="card-link">Card link</a>
//                 <a href="#" class="card-link">Another link</a>
//             </div>
//         </div>

//     `

//     for(var i = 0; i < posts4.length; i++) {

//         if(i == i3) {
            
//             userPost.innerHTML+= `
            
//             <div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                     <h5 class="card-title">${i+1}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${posts4[i]}</h6>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                     <button Onclick="Update2(${i})" type="button" class="btn btn-primary">Modifier</button>
//                     <button Onclick="Read()" type="button" class="btn btn-danger">Supprimer</button>
                    
//                 </div>
//             </div>
//             `


//         } else {

//             userPost.innerHTML+= `
        
//             <div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                     <h5 class="card-title">${i+1}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${posts2[i]}</h6>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                     <button Onclick="Update(${i})" type="button" class="btn btn-primary">Modifier</button>
//                     <button Onclick="Delete(${i})" type="button" class="btn btn-danger">Supprimer</button>
                    
//                 </div>
//             </div>
//             `
            

//         }

//     }

// }







