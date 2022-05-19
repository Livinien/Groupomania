
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