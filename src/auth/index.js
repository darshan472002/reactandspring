// isLoggedIn

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
};

// doLogin=> data=> set to loaclstorage

export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data)); // it is store the data into the localstorage, so its convert the data first into the string then store
    next();
};

// doLogout=> remove from localStorage

export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
};

// get currentUser

export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data"))?.user;
    }
    else {
        return undefined;        
    }
};

// get token for perform CRUD Operation

export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token
    }
    else {
        return null;
    }
}