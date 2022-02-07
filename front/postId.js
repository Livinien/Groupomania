
function postId() {

    const urlPost = new URLSearchParams(window.location.search);
    return(urlPost.get("id"));

}


const createPost = (post) => {

    const article = document.createElement('div');
    article.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;
    article.appendChild(title);

    const content = document.createElement('p');
    content.textContent = post.content;
    article.appendChild(content);

    const comments = document.createElement("a");
    comments.setAttribute("href", "");
    comments.textContent = `Commentaires`;
    article.appendChild(comments);

    return article

};


const displayPost = (post) => {
    const postDOM = document.querySelector('#postId');
    console.log(post);
        
    postDOM.appendChild(createPost(post));

};

post(postId()).then(displayPost)



