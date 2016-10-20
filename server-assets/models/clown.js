let clowns = [];

function Clown(name, hair, shoeSize, weapon, psycho) {
    this.name = name;
    this.hair = hair;
    this.shoeSize = shoeSize;
    this.weapon = weapon;
    this.psycho = psycho || true;
    this.dead = false;
}

function findClown(index) {
    if (index && index < clowns.length) {
        return clowns[index];
    }
    return { error: "That clown is still hiding." }
}

function addClown(clown) {
    let newClown = new Clown(clown.name, clown.hair, clown.shoeSize, clown.weapon, clown.psycho);
    clowns.push(newClown);
    return {message: "Clown added."}
}

function getClowns() {
    return clowns;
}

function killClown(index) {
    let clown = findClown(index);
    if (clown.error) {
        return clown
    }
    clowns[index].dead = true;
    return { message: "Clown is dead." }
}

function editClown(index, newClown) {
    let clown = findClown(index);
    if (clown.error) {
        return clown
    }
    for(let prop in clown){
        if(prop !== 'id'){
            clown[prop] = newClown[prop];
        }
    }
    return {message: "Clown updated."}
}

module.exports = {
    addClown,
    getClowns,
    killClown,
    editClown,
    getClown: findClown
}

