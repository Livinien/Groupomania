const url = 'http://localhost:3001';


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
        methode: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(User)

    });

    const json = await res.json()
    return json

}




// POST //

// METTRE EN LIGNE UN POST //

async function postArticle() {

const res = await fetch(url + "/api/post/article", 

{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article)


});

    const json = await res.json()
    return json


}



// RECUPERER UN POST //

async function post() {

    const res = await fetch(url + "/api/post/article",);

    const json = await res.json()
    return json

}




