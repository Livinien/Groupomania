 class Authentification {

    static save(token, email) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    }

    static isConnected() {
        return localStorage.getItem("token") !== null;
    }

    static getEmail() {
        return localStorage.getItem("email");
    }

    static getToken() {
        return localStorage.getItem("token");
    }

}

