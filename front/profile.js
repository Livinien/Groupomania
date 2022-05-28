
// UPLOADE SA PHOTO DE PROFILE //

const changeImageForm = document.querySelector("#imageUrl");
const newImage = document.querySelector("#image");


async function profile_img() {

    const avatar = await getProfile(pseudo, description);
    
    if(avatar !== null) {
        newImage.src = avatar.imageUrl;
        
        document.querySelector("#pseudo").value = avatar.pseudo;
        document.querySelector("#description").value = avatar.description;

        console.log(avatar);
    }

    
    
    changeImageForm.addEventListener('change', () => {
        
        if(changeImageForm.files && changeImageForm.files[0]) {
    
            // FileReader() permet d'afficher l'image une fois sélectionner //
            const reader = new FileReader();
        
            // onload est un événement qui fonctionne de la même manière qu'un addEventListener //
            reader.onload = function(e) {
                // "target" renvoie à l'événement onload //
                // "result" renvoi l'image //
                newImage.src = e.target.result;
            };
        
            reader.readAsDataURL(changeImageForm.files[0]);
    
            
        }
    });
}

profile_img();






// UPLOADE LE PRÉNOM ET LA DESCRIPTION //

const biography = document.getElementById("displayBiography");

biography.addEventListener("click", (e) => {

    e.preventDefault();
    
    const formData = new FormData();
    const pseudo = document.querySelector("#pseudo").value;
    const description = document.querySelector("#description").value;

    formData.append("pseudo", pseudo);
    formData.append("description", description);
    formData.append("image", changeImageForm.files[0]);

    sendBiography(formData);

    return false;

});




// SUPPRIMER LE PROFILE DE L'UTILISATEUR //


const deleteAccount = () => {


    const deleteUser = document.querySelector('#deleteAccount');

    const windowDeleteProfile = document.createElement('div');
        windowDeleteProfile.classList.add('doorDelete');
        windowDeleteProfile.style.display = "none";

    deleteUser.appendChild(windowDeleteProfile);
    
    
    const messageDeleteProfile = document.createElement('div');
        messageDeleteProfile.classList.add('messageDeleteProfile');
        messageDeleteProfile.style.display = "none";

    deleteUser.appendChild(messageDeleteProfile);
    
    
    
    const titleDeleteProfile = document.createElement('div');
        titleDeleteProfile.classList.add('titleDeleteProfile');
        titleDeleteProfile.style.display = "none";
        titleDeleteProfile.textContent = `Êtes-vous sur de vouloir supprimer votre profile ?`;

    messageDeleteProfile.appendChild(titleDeleteProfile);
    


    
    const buttonSuppressionProfile_1 = document.createElement('div');
        buttonSuppressionProfile_1.classList.add('buttonSuppressionProfile_1');
        buttonSuppressionProfile_1.style.display = "none";
        buttonSuppressionProfile_1.textContent = `Oui`;

    messageDeleteProfile.appendChild(buttonSuppressionProfile_1);
    
    
    
    const buttonSuppressionProfile_2 = document.createElement('div');
        buttonSuppressionProfile_2.classList.add('buttonSuppressionProfile_2');
        buttonSuppressionProfile_2.style.display = "none";
        buttonSuppressionProfile_2.textContent = `Annuler`;

    messageDeleteProfile.appendChild(buttonSuppressionProfile_2);

    

    
    deleteUser.addEventListener('click', (e) => {
        e.stopPropagation();
        
        windowDeleteProfile.style.display = "block";
        messageDeleteProfile.style.display = "block";
        titleDeleteProfile.style.display = "block";
        buttonSuppressionProfile_1.style.display = "block";
        buttonSuppressionProfile_2.style.display = "block";

    });

    
    
    buttonSuppressionProfile_2.addEventListener('click', (e) => {
        e.stopPropagation();

        windowDeleteProfile.style.display = "none";
        messageDeleteProfile.style.display = "none";
        titleDeleteProfile.style.display = "none";
        buttonSuppressionProfile_1.style.display = "none";
        buttonSuppressionProfile_2.style.display = "none";
    });


    return deleteUser;


}

deleteAccount();





// const deleteUser = document.getElementById("deleteAccount");


// deleteUser.addEventListener("click", (e) => {

//     const pseudo = document.getElementById("pseudo").value;
//     const description = document.getElementById("description").value;


//     deleteProfile()

//     localStorage.clear("token");

//     window.location.href = "index.html"

// })