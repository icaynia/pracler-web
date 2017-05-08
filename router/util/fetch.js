String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

exports.fetch = (str) => {
    return str.replace(/ /gi, '+');
}

exports.unfetch = (str) => {
    return str.replaceAll('+', ' ');
}
