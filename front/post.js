



// FORMULAIRE DE CREATION DE POST //


const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("imageUrl").files[0];

    const postToSend = { title, content };
    
    const post = sendPost(postToSend, image);
    console.log(post);

    return false;
});




// CREATION DU COMMENTAIRE AVEC LE NOM DE L'UTILISATEUR //

const createComment = (comment) => {

    const com = document.createElement('div');
    
    const author = document.createElement('strong');
    author.textContent = comment.User.firstname;

    com.appendChild(author);


    const coms = document.createElement('strong');
    coms.textContent = comment.content;
    
    com.appendChild(coms);

    return com

}



// CREATION DE POSTS - DOM // 

const createPost = (post) => {
    

    const article = document.createElement('div');
    article.classList.add('post');


    
    // TITRE DU POST //
    const title = document.createElement('h2');
    title.textContent = post.title;
    article.appendChild(title);


    // CONTENU DU POST //
    const content = document.createElement('p');
    content.textContent = post.content;
    article.appendChild(content);
    

    // IMAGE DU POST //   
    const image = document.createElement('img');
    image.src = '../img_posts/' + post.imageUrl;
    article.appendChild(image);




    // (AVEC LA CONDITION "IF") SEUL L'AUTEUR DU POST PEUT SUPPRIMER SON OU SES POST(S) //
    
    const UserId = localStorage.getItem("userId");

    if(UserId == post.UserId) {


        // SUPPRIMER ET MODIFIER LE POST //
        const points = document.createElement('span');
        points.setAttribute("class", "points");
        points.textContent = `...`;

        
        
        // CLICK EVENEMENT DES TROIS POINTS //
        points.addEventListener('click', (e) => {
            modifierPost.style.display = "block";
            supprimerPost.style.display = "block";
        })
        article.appendChild(points);





        // CACHER LE BOUTON MODIFIER //

        const modifierPost = document.createElement('div');
        modifierPost.classList.add('modifyPost');
        modifierPost.style.display = "none";
        modifierPost.textContent = `Modifier`;


        // CACHER LE BOUTON SUPPRIMER //
        const supprimerPost = document.createElement('div');
        supprimerPost.classList.add('deletePost');
        supprimerPost.style.display = "none";
        supprimerPost.textContent = `Supprimer`;

    
        article.appendChild(modifierPost)
        article.appendChild(supprimerPost)


       

        

// ---------- PHASE DE MODIFICATION DU POST ----------- // 
        
        // CACHER L'OVERLAY //
        const modifier = document.createElement('div');
        modifier.classList.add("windowModify");
        modifier.style.display = "none";

        article.appendChild(modifier);


        // CACHER LE MENU DEROULANT AU MOMENT DU CLIQUE SUR LES TROIS PETITS POINTS //
        modifierPost.addEventListener('click', (e) => {
            modifierPost.style.display = "none";
            supprimerPost.style.display = "none";
            
        })
        article.appendChild(modifierPost);


        // AFFICHER L'OVERLAY POUR LE FOND DU FORMULAIRE, AU CLIQUE DES TROIS PETITS POINTS //
        modifierPost.addEventListener('click', (e) => {
            modifier.style.display = "block";
        })
        article.appendChild(modifierPost);






        // AFFICHER LE FORMULAIRE POUR MODIFIER LE POST//
        const form = document.createElement('form');
        form.classList.add('registrationForm');

        article.appendChild(form);
        


        // TITRE DU MODAL //
        const modifiePost = document.createElement('h2');
        modifiePost.classList.add('postModify');
        modifiePost.style.display = "none";
        modifiePost.textContent = `Modifier la Publication`;

        article.appendChild(modifiePost);


        // CROIX POUR FERMER LA FENETRE DU MODAL //
        const croix = document.createElement('h2');
        croix.classList.add('cross');
        croix.style.display = "none";
        croix.textContent = `X`;

        article.appendChild(croix);



        // CHANGER LE TITRE DU POST //
        const titleModifier = document.createElement('input')
        titleModifier.classList.add('titleModify');
        titleModifier.value = post.title;
        titleModifier.style.display = "none";
        titleModifier.placeholder = "Titre du Post";

        article.appendChild(titleModifier);



        // CHANGER LE TEXTAREA //
        const texteareaModify = document.createElement('textarea');
        texteareaModify.classList.add('texteareaModify');
        texteareaModify.value = post.content;
        texteareaModify.style.display = "none";
        texteareaModify.placeholder = "Ecriver votre Histoire...";

        article.appendChild(texteareaModify);



        // MODIFIER L'IMAGE DU POST //
        const fileModifier = document.createElement('input');
        fileModifier.setAttribute("type", "file")
        fileModifier.classList.add('fileModify');
        fileModifier.style.display = "none";

        article.appendChild(fileModifier);



        // VALIDER LA MODIFICATION //
        const envoyePost = document.createElement('button');
        envoyePost.classList.add('check');
        envoyePost.style.display = "none";
        envoyePost.textContent = `ENVOYÉ`;
        envoyePost.type = 'button';

        article.appendChild(envoyePost);

        
        // FAIRE APPARAITRE L'OVERLAY DE MODIFICATION DU POST //
        modifierPost.addEventListener('click', (e) => {
            modifiePost.style.display = "block";
            croix.style.display = "block";
            titleModifier.style.display = "block";
            texteareaModify.style.display = "block";
            fileModifier.style.display = "block";
            envoyePost.style.display = "block";
        })



        envoyePost.addEventListener('click', (e) => {
            e.preventDefault();
            // FAIRE DISPARAITRE L'OVERLAY DE MODIFICATION DU POST //
            modifier.style.display = "none";
            modifiePost.style.display = "none";
            croix.style.display = "none";
            titleModifier.style.display = "none";
            texteareaModify.style.display = "none";
            fileModifier.style.display = "none";
            envoyePost.style.display = "none";


            // ENVOYER AU BACKEND LA REPONSE POUR LA MODIFICATION DU POST //
            const title = titleModifier.value;
            const content = texteareaModify.value;
            const image = fileModifier.files[0];

            const modifierPost = { title, content };
            
            const postModify = sendModifyPost(modifierPost, post.id, image);
            console.log(postModify);

            return false
                        
        })
    



        // (BOUTON MODIFIER) SUPPRIMER L'OVERALY QUAND JE CLIQUE SUR LA CROIX //
        croix.addEventListener('click', (e) => {
            modifiePost.style.display = "none";
            croix.style.display = "none";
            titleModifier.style.display = "none";
            texteareaModify.style.display = "none";
            modifier.style.display = "none";
            fileModifier.style.display = "none";
            envoyePost.style.display = "none";
        });
        article.appendChild(croix);
    


       


// ---------- PHASE DE SUPPRESSION DU POST -------------- //

        
        // OVERLAY POUR LIRE PLUS FACILEMENT LE MESSAGE INTERMEDIAIRE DE SUPPRESSION OU NON DU POST //
        const windowSupprimer = document.createElement('div');
        windowSupprimer.classList.add('windowDelete');
        windowSupprimer.style.display = "none";

        article.appendChild(windowSupprimer);


        
        // MESSAGE INTERMEDIAIRE POUR VALIDER LA SUPPRESSION DU POST OU NON //
        const messageSupprimer = document.createElement('div');
        messageSupprimer.classList.add('messageDelete');
        messageSupprimer.style.display = "none";

        article.appendChild(messageSupprimer);



        // CREATION DU TITRE "VOULEZ-VOUS SUPPRIMER CE POST" //
        const titreSuppression = document.createElement('div');
        titreSuppression.classList.add('titleSuppression');
        titreSuppression.style.display = "none";
        titreSuppression.textContent = `Voulez-vous supprimer ce post ?`;

        messageSupprimer.appendChild(titreSuppression);



        // CREATION DU BOUTON "OUI" //
        const buttonSuppression = document.createElement('button');
        buttonSuppression.classList.add('btnSuppression1');
        buttonSuppression.style.display = "block";
        buttonSuppression.textContent = `Oui`
        messageSupprimer.appendChild(buttonSuppression);



        // CREATION DU BOUTON "ANNULER" //
        const buttonabandoned = document.createElement('button');
        buttonabandoned.classList.add('btnSuppression2');
        buttonabandoned.style.display = "block";
        buttonabandoned.textContent = `Annuler`
        messageSupprimer.appendChild(buttonabandoned);

        
        
        // FAIRE DISPARAITRE LES BOUTONS MODIFIER / SUPPRIMER QUAND LE FOND POUR LE MESSAGE INTERMEDIAIRE APPARAIT //
        supprimerPost.addEventListener('click', (e) => {
            modifierPost.style.display = "none";
            supprimerPost.style.display = "none";
            windowSupprimer.style.display = "block";
            messageSupprimer.style.display = "block";
            titreSuppression.style.display = "block";
        })
        article.appendChild(supprimerPost);

        
    

        // CONFIRMER LA SUPPRESSION DU POST DANS LE MESSAGE INTERMEDIAIRE //
        buttonSuppression.addEventListener('click', (e) => {
            deletePost(post.id);

            article.remove();
        })
        
        // ANNULER LA SUPPRESSION DU POST DANS LE MESSAGE INTERMEDIAIRE //
        buttonabandoned.addEventListener('click', (e) => {
            windowSupprimer.style.display = "none";
            messageSupprimer.style.display = "none";
            titreSuppression.style.display = "none";
        })

    }

    
//--------------------- COMMENTAIRE --------------------------//
        
    // LIKES //
    const likes = document.createElement("a");
    likes.classList.add('likes');
    likes.textContent = `👍🏼 J'aime`;
    article.appendChild(likes);


    // ON/OFF LORSQU'ON CLIQUE SUR LE BOUTON "J'AIME" //
    let clicked = false;

    likes.addEventListener('click', async (e) => {
        if(!clicked) {
            clicked = true;
            likes.style.background = "#2c95ff";
            likes.style.color = "#fff";

        } else {
            clicked = false;
            likes.style.background = "#fff";
            likes.style.color = "#000";
        }
    });


    // LIEN CLIQUABLE "COMMENTAIRES" //
    const comments = document.createElement("a");
    comments.setAttribute("href", "#");
    comments.textContent = `Commentaires`;
    article.appendChild(comments);

    

    // LE CHAMPS (TEXTAREA) //
    const textarea = document.createElement('textarea');
    textarea.style.display = "none";
    article.appendChild(textarea);

    // DIV PERMETTANT DE CACHER LES COMMENTAIRES DU POST //
    const commentsContent = document.createElement('div');
    commentsContent.style.display = "none";
    commentsContent.setAttribute("class", "commentaire");
    article.classList.add('coms');
    article.appendChild(commentsContent);
    
    
    // BOUTON VALIDER //
    const button = document.createElement("button");
    button.textContent = 'Valider';
    button.style.display = "none";
    article.appendChild(button);


    const displayAllComments = (comments) => {
        console.log(comments);
        comments.forEach((comment) => {
            
            commentsContent.appendChild(createComment(comment));
        
        })
        
    };
    
    getComments(post.id).then(displayAllComments);
    

    

    // APPARITION DES ELEMENTS AU CLIC D'EVENEMENTS //
    
    comments.addEventListener('click', async (e) => {

        e.preventDefault()
        textarea.style.display = "block";
        button.style.display = "block";
        commentsContent.style.display = "block";

    });



    // EVENEMENTS DU BOUTON VALIDER AU CLICK //

    button.addEventListener('click', async (e) => {
        
        // Si il y a quelque chose dans le champs (textarea) alors tu envois les données au back-end //
        if(textarea.value != "") {

            const commentToSend = { 
    
                PostId: post.id,
                content: textarea.value,
                
                
            };
            
    
            const comment = await sendComment(commentToSend);
            console.log(comment);
            

        } else {

            // Sinon tu affiches un message d'erreur si il n'y a rien dans le champs (textarea) //
            const messError = document.createElement("p");
            messError.textContent = `Aucun message n'a pu être envoyé`;
            messError.style.color = "red";
            article.appendChild(messError);

        }

    });

    // LIKES //

    // const liked = post.likes.filter((like) => like.email === Authentification.getEmail()).length > 0;

    // const likes = document.createElement("a");
    // likes.setAttribute("href", "#");
    // likes.textContent = `${post.likes.length}
    //                      ${liked ? "Je n'aime plus": "J'aime"}`;
    // article.appendChild(likes);

    // likes.addEventListener("click", () => like(post, likes));
    
    
    return article;
    
};    



// AFFICHER TOUT LE CONTENU DU POST //

const displayAllPosts = (posts) => {
    const postsDOM = document.querySelector('#posts');
    console.log(posts);
        
    posts.forEach((post) => {
        
        postsDOM.appendChild(createPost(post));
    })

};

posts().then(displayAllPosts);

