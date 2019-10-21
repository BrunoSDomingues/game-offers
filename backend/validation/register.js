const valid = require('validator');
const isEmpty = require('is-empty');

module.exports = function checkRegister(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : "";

    if (valid.isEmpty(data.name)) {
        errors.name = "O campo nome é obrigatório!";
    }

    if (valid.isEmpty(data.email)) {
        errors.email = "O campo email é obrigatório!";
    } else if (valid.isEmail(data.email)) {
        errors.email = "Email inválido!";
    }

    if (valid.isEmpty(data.password)) {
        errors.password = "O campo senha é obrigatório!";
    } else if (valid.isEmpty(data.cpassword)) {
        errors.cpassword = "O campo confirmar senha é obrigatório!";
    }

    if (!valid.equals(data.password, data.cpassword)) {
        error.cpassword = "Senhas não batem!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};