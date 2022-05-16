const { ObjectId } = require("mongodb");

module.exports = {
    checkString(name, value) {
        if (!value) throw `${name} not provided`;
        if (typeof value !== "string") throw `Invalid ${name}`;
        if (value.trim().length === 0) throw `Invalid ${name}`;
        if (!isNaN(value)) throw `Invalid ${name}`;
        return value;
    },
    checkNumber(name, value) {
        if (!value) throw `${name} not provided`;
        if (typeof value !== "number") throw `Invalid ${name}`;
        return value;
    },
};
