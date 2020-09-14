const Storage = {
    engine: localStorage,

    has(name) {
        return this.engine.getItem(name);
    },
    
    get(name) {
        return JSON.parse(this.engine.getItem(name));
    },
    
    store (key, value) {
        this.engine.setItem(key, JSON.stringify(value));
    },
    
    clear(){
        this.engine.clear();
    }
}
