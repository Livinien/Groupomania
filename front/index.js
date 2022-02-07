// const loginBtnHTML = `<button id="login">Connexion</button>`;
// const logoutBtnHTML = `<button id="logout">Déconnexion</button>`;


// const displayHTML = `<div id="display"></div>`;
// document.body.insertAdjacentHTML("afterbegin", displayHTML)
// const display = document.getElementById("display");


// function CreateToken() {

//     localStorage.setItem("token", "SalutCestMoi");

// };



// function loginLogic() {

//     display.innerHTML = loginBtnHTML;
//     const loginBtn = document.getElementById("login");
//     loginBtn.addEventListener("click", (e) => {

//         logMe();

//         window.location.reload();

//     });
// }


// function logMe() {

//     CreateToken();
//     window.location.reload();

// }


// function logoutLogic() {

//     display.innerHTML = logoutBtnHTML;
//     const logoutBtn = document.getElementById("logout");
//     logoutBtn.addEventListener("click", (e) => {

//         disconnectMe();
//     })

// }


// function disconnectMe() {

//     localStorage.removeItem("token")
//     window.location.reload();
// }


// function isloged() {

//     const token = localStorage.getItem("token");



//     if(token) {

//         logoutLogic();

//     } else {

//         if(
//             !window.location.pathname.includes("index"))
//             if(!window.location.pathname.includes("erreur.html")){
//             !window.location.pathname.includes("contact")
         
//             }
            
        

//         loginLogic();


//     }

// }


// // SUPPRIMER LE TOKEN UNE FOIS DECONNECTER //

// const logout = document.getElementById("logout");

// logout.addEventListener("click", (e) => {

//     localStorage.removeItem("token")
//     window.location.href = "index.html";

// });

// const token = localStorage.getItem("token");
// if(!token) {

//     window.location.href = "index.html"

// }

         