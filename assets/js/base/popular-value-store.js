
function PopularIdStore(size, store) {
    if (!store) {
        throw new Error('Invalid store: ' + store);
    }
    if (!size || size < 2) {
        throw new Error('Invalid size: ' + size);
    }
    this._store = store;
    this._size = size;
}

PersonalPopularId.prototype.get = function (size) {

}

PersonalPopularId.prototype.add = function (id, rank) {
    rank = rank || 1;
}

function parseValue(value){
    
}

exports.PersonalPopularId = PersonalPopularId;
