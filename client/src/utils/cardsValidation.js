import { errorToast } from "./toastMessages";

const validateAmerican = (inputtxt) => {
    var cardno = /^(?:3[47][0-9]{13})$/;
    if(inputtxt.match(cardno)) return true;
    else return false;
}

const validateVisa = (inputtxt) => {
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    if(inputtxt.match(cardno)) return true;
    else return false;
}

const validateMaster = (inputtxt) => {
    var cardno = /^(?:5[1-5][0-9]{14})$/;
    if(inputtxt.match(cardno)) return true;
    else return false;
}

export const validateCard = (cardNum, toast) => {
    if (
        validateAmerican(cardNum)
        ||
        validateVisa(cardNum)
        ||
        validateMaster(cardNum)
    ) return true
    else {
        errorToast(toast, "incorrect card number");
        return false
    }
}