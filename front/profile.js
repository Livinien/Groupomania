
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





// AFFICHER L'IMAGE SUR LE SITE //

const displayPicture = document.querySelector("#displayPicture");

displayPicture.addEventListener("click", (e) => {

    sendImage(changeImageForm.files[0]);

    return false;
});





// UPLOADE LE PRÉNOM ET LA DESCRIPTION //

const biography = document.getElementById("biography");

const formData = new FormData(biography)


biography.addEventListener("submit", (e) => {

    e.preventDefault();

    const profile = sendBiography(formData);

    console.log(profile);

    return false;

});


