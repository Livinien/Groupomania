
    // SIGNUP //

const signupForm = document.getElementById("signupForm");


signupForm.addEventListener("submit", async (e) => {
    
    e.preventDefault()

    const user = { 

        firstname: document.getElementById("firstname").value, 
        lastname: document.getElementById("lastname").value, 
        email: document.getElementById("email").value,
        password: document.getElementById("password").value, 
        confirmPassword: document.getElementById("confirmPassword").value 
    } 

    console.log(user);
    
    let matchPassword = false
    let isValidFirstname = false
    let isValidLastname = false
    let isValidEmail = false
    let isValidPassword = false
    let isValidConfirmPassword = false

    
    if(user.password === user.confirmPassword) {

        matchPassword = true

    }



    
        // FIRSTNAME //

    const erreurFirstname = document.getElementById("msgErreurFirstname")
    erreurFirstname.innerHTML = null


    if(user.firstname) {

    if(user.firstname.length === 0) {
        console.log(user.firstname);
        erreurFirstname.innerHTML = "Prénom manquant"

    }
        
    if(user.firstname.length < 3) {
        console.log(user.firstname);
        erreurFirstname.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {
        isValidFirstname = true
        console.log(isValidFirstname);
    } 

} 


        // LASTNAME //

    const erreurLastname = document.getElementById("msgErreurLastname")
    erreurLastname.innerHTML = null

    if(user.lastname.length === 0) {
        console.log(user.lastname);
        erreurLastname.innerHTML = "Nom manquant"
    }

    if(user.lastname) {

        
    if(user.lastname.length < 3) {
        console.log(user.lastname);
        erreurLastname.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidLastname = true
        console.log(isValidLastname);

    }

}



        // EMAIL //

    const erreurEmail = document.getElementById("msgErreurEmail")
    erreurEmail.innerHTML = null

    if(user.email.length === 0) {
        console.log(user.email);
        erreurEmail.innerHTML = "Email manquant"
    }

    if(user.email) {

        
    if(user.email.length < 3) {
        console.log(user.email);
        erreurEmail.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidEmail = true
        console.log(isValidEmail);

    }

}


   
        // PASSWORD //

    const erreurPassword = document.getElementById("msgErreurPassword");
    erreurPassword.innerHTML = null


    if(user.password.length === 0) {
        console.log(user.password);
        erreurPassword.innerHTML = "Password manquant"
    }

    if(user.password) {

        
    if(user.password.length < 3) {
        console.log(user.password);
        erreurPassword.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidPassword = true
        console.log(isValidEmail);

    }

}

   
        // CONFIRM PASSWORD //

    const erreurConfirmPassword = document.getElementById("msgErreurConfirmPassword");
    erreurConfirmPassword.innerHTML = null

    if(user.confirmPassword === 0) {
        console.log(user.confirmPassword);
        erreurConfirmPassword.innerHTML = "Password manquant"
    }

    if(user.confirmPassword) {

        
    if(user.confirmPassword.length < 3) {
        console.log(user.confirmPassword);
        erreurConfirmPassword.innerHTML = "Vous devez mettre au moins aux 3 lettres"

    } else {

        isValidConfirmPassword = true
        console.log(isValidConfirmPassword);

    }

}


        // CONFIRMER LA REQUÊTE //

    if(isValidFirstname && isValidLastname && isValidEmail && isValidPassword && isValidConfirmPassword && matchPassword) {

        const json = await signup(user)

        if(json.token) {

            localStorage.setItem("token", json.token)
            window.location.href = "post.html";

        } else {

            alert(json.error)

        }
        
        console.log(json);

    }

});




