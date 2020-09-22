/*
méthode de stockage des données chez le client
objet qui permet gràce a ses méthodes de modifier et 
d'intéragir avec le storage
*/
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
