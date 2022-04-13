
// MODIFIER SA PHOTO DE PROFILE //



// const profile_img = document.getElementById("imageProfile");

// profile_img.addEventListener("submit", (e) => {

//     e.preventDefault()
//     const profileImage = document.getElementById("imageUrl").files[0];
//     const profileForm = sendImage(profileImage);
//     console.log(profileForm);

//     return false;

// });



// const changeImageForm = document.getElementById("imageProfile");

// changeImageForm.addEventListener("submit", (e) => {

//     e.preventDefault();

//     // PHOTO DE PROFILE //   
//     const newImage = document.getElementById('imageUrl').files[0];
//     const imageDisplay = document.getElementById('image');

//     imageDisplay.src = '../img_posts/' + newImage.name;

// });
    

const changeImageForm = document.querySelector("#imageUrl");
const newImage = document.querySelector("#image");


async function init() {

    const avatar = await getAvatar();
    
    if(avatar !== null) {
        newImage.src = avatar;
    }

    
    changeImageForm.addEventListener('change', () => {
    
        if(changeImageForm.files && changeImageForm.files[0]) {
    
            // FileReader() permet d'afficher l'image une fois sélectionner //
            const reader = new FileReader();
        
            // onload est un événement qui fonctionne de la même manière qu'un addEventListener //
            reader.onload = function (e) {
            // "target" renvoie à lo'événement onload //
            // "result" renvoi l'image //
            newImage.src = e.target.result;
            };
        
            reader.readAsDataURL(changeImageForm.files[0]);
    
            sendImage(changeImageForm.files[0]);
    
        }
    });
}

init();



   







// MODIFIER SON PROFILE //

const profile_info = document.getElementById("infoProfile");

profile_info.addEventListener("submit", (e) => {

    e.preventDefault();
    const profileName = document.getElementsById("name").value;
    const profileDescription = document.getElementById("description").value;

    const profileToSend = { profileName, profileDescription };
    console.log(profileToSend);

    return false;

})


