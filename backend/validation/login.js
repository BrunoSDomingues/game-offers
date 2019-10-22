const valid = require('validator');
const isEmpty = require('is-empty');

module.exports = function checkLogin(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (valid.isEmpty(data.email)) {
        errors.email = "O campo email é obrigatório!";
    } else if (!valid.isEmail(data.email)) {
        errors.email = "Email inválido!";
    }

    if (valid.isEmpty(data.password)) {
        errors.password = "O campo senha é obrigatório!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};