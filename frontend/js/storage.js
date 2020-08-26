function has(name) {
    return localStorage.getItem(name);
}

function get(name) {
    return JSON.parse(localStorage.getItem(name));
}

function store (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function clear(){
    localStorage.clear();
}