const jsonData = require('./jsondata');

function isMatch() {
    return true;
}

function setrule(rules) {
    let need = false;
    for (const rule of rules) {
        if (rule.leftParenthesis) {
            need = true;
        }

        if (rule.rightParenthesis) {
            need = false;
        }
    }
}

const res = [];
for (const data of jsonData) {
    for (const rule of data.rules) {
        if (rule.leftParenthesis) {

        }
    }
} 