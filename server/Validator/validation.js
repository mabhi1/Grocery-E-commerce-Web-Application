const { ObjectId } = require("mongodb");

module.exports = {
    checkId(id) {
        if (!id) throw "ID not provided";
        if (typeof id !== "string") throw "Invalid ID";
        if (id.trim().length === 0) throw "Invalid ID";
        if (!ObjectId.isValid(id)) throw "Invalid ID";
        return id;
    },

    checkString(name, value) {
        if (!value) throw `${name} not provided`;
        if (typeof value !== "string") throw `Invalid ${name}`;
        if (value.trim().length === 0) throw `Invalid ${name}`;
        if (!isNaN(value)) throw `Invalid ${name}`;
        return value;
    },
};
