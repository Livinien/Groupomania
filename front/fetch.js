
const url = 'http://localhost:3001';


            // INSCRIPTION / CONNEXION UTILISATEUR //


// SIGNUP //

async function signup(newUser) {

    const res = await fetch(url + "/api/user/signup", 
    { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(newUser)
    });

    const json = await res.json()
    return json

}



// LOGIN //

async function login(User) {

    const res = await fetch(url + "/api/user/login",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(User)

    });

    const json = await res.json()
    return json

}




                // SECTION POST //



// POST //

// METTRE EN LIGNE UN NOUVEAU POST //


async function sendPost(post, image) {

    console.log(post, image);
    const formData = new FormData()
    formData.append('post', JSON.stringify(post));
    formData.append('image', image);
    
    let token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/api/post", {

        method: "POST",
        headers: { 
        
            Authorization: "Bearer " + token,
            
        },
        
        body: formData,
        
    });

    const json = await res.json();
    return json.Post;

}


// MODIFIER LE POST //

async function sendModifyPost(post, id, image) {

    console.log(post, image);
    const formData = new FormData()
    formData.append('post', JSON.stringify(post));
    formData.append('image', image);
    
    let token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/api/post/" + id, {

        method: "PUT",
        headers: { 
        
            Authorization: "Bearer " + token,
            
        },
        
        body: formData,
        
    });

    const json = await res.json();
    return json.Post;

}


    



// AFFICHER TOUS LES POSTS //

async function posts() {

    return fetch("http://localhost:3001/api/post", {


        method: "GET",
        headers: { 
            
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Authentification.getToken()}`
        
        },
            
    })

    .then(res => {

        if(res.ok) {

            return res.json();

        }

        if(res.status === 401) {

            window.location.href = "/login";

        }

        
    })
    
}

    

// AFFICHER UN SEUL POST //

async function post(id) {

    return fetch("http://localhost:3001/api/post/" + id, {

        method: "GET",
        headers: { 
            
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Authentification.getToken()}`
        
        },
            
    })


    .then(res => {

        if(res.ok) {

            return res.json();

        }

    })

}


// SUPPRIMER UN POST //

async function deletePost(id) {

    return fetch("http://localhost:3001/api/post/" + id, {


        method: "DELETE",
        headers: { 
            
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Authentification.getToken()}`
        
        },
            
    })

    .then(res => {

        if(res.ok) {

            return res.json();

        }
        
    })
    
}








                // SECTION COMMENTAIRE //



// METTRE EN LIGNE UN NOUVEAU COMMENTAIRE //


async function sendComment(comment) {

    let token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/api/Comment/", {

        method: "POST",
        headers: { 
            
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        
        body: JSON.stringify(comment),
        

    });


    const json = await res.json();
    return json.comment;
    
}





// AFFICHER TOUS LES COMMENTAIRES SUR UN SEUL POST //

async function getComments(id) {

    return fetch("http://localhost:3001/api/Comment/" + id, {

        method: "GET",
        headers: { 
            
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Authentification.getToken()}`
        
        },
            
    })

    .then(res => {

        if(res.ok) {

            return res.json();

        }

    })

}








