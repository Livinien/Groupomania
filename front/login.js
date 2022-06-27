

const loginForm = document.getElementById("loginForm");


// LOGIN //


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const user = { 
         
        email: document.getElementById("email").value,
        password: document.getElementById("password").value, 
        
    } 


    let isValidEmail = false
    let isValidPassword = false

    



    // EMAIL //

    const erreurEmail = document.getElementById("msgErreurEmail")
    erreurEmail.innerHTML = null

    if(user.email.length === 0) {
        erreurEmail.innerHTML = "Email manquant"
    }

    if(user.email) {

        
    if(user.email.length < 3) {
        erreurEmail.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidEmail = true

    }}


   

    // PASSWORD //

    const erreurPassword = document.getElementById("msgErreurPassword");
    erreurPassword.innerHTML = null

    if(user.password === 0) {
        erreurPassword.innerHTML = "Password manquant"
    }

    if(user.password) {

        
    if(user.password.length < 3) {
        erreurPassword.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidPassword = true
        
    }}



    // CONFIRMER LA REQUÊTE //

    if(isValidEmail && isValidPassword) {

        const json = await login(user)
        if(json.token) {

            localStorage.setItem("token", json.token)
            localStorage.setItem("userId", json.userId)
            localStorage.setItem("isAdmin", JSON.stringify(json.isAdmin))
            window.location.href = "post.html";

        } else {

            alert(json.error)

        }

    } 
    

});