function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
}

function convertToNumber(data){
    const isNumber = !isNaN(data);
    return isNumber ? Number(data) : data;
}

module.exports = {
    isEven,
    convertToNumber
}