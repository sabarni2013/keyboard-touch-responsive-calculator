var no;
var valueCaptured = ''; var displCaptured = '';
var operationCaptured;
var flag = false; let len;
(function ($) {

    $(document).ready(function () {
        $(document).keypress(function (event) {
            enableEnter(event, 'key');
        });
        getNo = function (no) {
            enableEnter(no, 'click');
        }


    })
})(jQuery)
function enableEnter(event, method) {
    
    let operatorArray = ['+', '/', '-', '*'];
    if (method == 'key') {
        if (event.key.charCodeAt() > 47 && event.key.charCodeAt() < 58) {
            no = event.key;
        } else if (event.key.charCodeAt() == 42) no = '*';
        else if (event.key.charCodeAt() == 47) no = '/';
        else if (event.key.charCodeAt() == 43) no = '+';
        else if (event.key.charCodeAt() == 45) no = '-';
        else if (event.key.charCodeAt() == 32) no = 'C';
        else if (event.key.charCodeAt() == 61) no = '=';
        else {
            no = '=';
            valueCaptured = '';
            displCaptured = ' ';
            operationCaptured = '';
        }
    } else {
        no = event;
    }

    if (no !== '=' && !document.getElementById('displayNos') && !document.getElementById('calculate')) {
        valueCaptured = '';
        displCaptured = ' ';
        operationCaptured = '';
        flag = false;
        document.getElementById('loginHead').innerHTML = '<div class="displayNos" id="displayNos"></div><div class="calculate" id="calculate"></div>';
    }
    displCaptured = displCaptured + no;
    console.log('isNaN(no)..', isNaN(no), '..no', no);
    if (isNaN(no)) {
        if (displCaptured && (displCaptured.split('')[displCaptured.length - 1] === no)) {
            len = displCaptured.length;
            displCaptured = displCaptured.split('');
            if ((operatorArray.indexOf(displCaptured[len - 1]) > -1) && (operatorArray.indexOf(displCaptured[len - 2]) > -1)) {
                displCaptured.splice(len - 2, 1);
            }

            displCaptured = displCaptured.join('');
        }
        if (no === 'C') {
            valueCaptured = '';
            displCaptured = '';
            operationCaptured = '';
            flag = false;
        } else if (no === '=') {
            console.log('document.getElementById(loginHead).innerText', document.getElementById('loginHead').innerText);
            if (document.getElementById('displayNos') && document.getElementById('calculate')) {
                document.getElementById('loginHead').innerText = valueCaptured;
            }
        } else {
            flag = true;
            operationCaptured = no;
        }

    } else {
        console.log('flag..', flag);
        console.log('operationCaptured', operationCaptured);
        if (flag) {
            valueCaptured = Number(valueCaptured);
            if (displCaptured && displCaptured != '') {
                displCaptured = displCaptured.split('');
                len = displCaptured.length;
                let str = '';
                while (len > 0) {
                    if (!isNaN(displCaptured[len - 1])) {
                        str = str + displCaptured[len - 1];
                    } else {
                        if (str.length > 1) {
                            let noReverse = str.split('').reverse().join('');
                            noReverse = noReverse.split('');
                            noReverse.pop();
                            noReverse = noReverse.join('');
                            console.log('noReverse..', noReverse);
                            switch (operationCaptured) {
                                case '+': valueCaptured = Number(valueCaptured) - Number(noReverse); break;
                                case '-': valueCaptured = Number(valueCaptured) + Number(noReverse); break;
                                case '/': valueCaptured = Number(valueCaptured) * Number(noReverse); break;
                                case '*': valueCaptured = Number(valueCaptured) / Number(noReverse); break;
                            }

                        }

                        len = 0;
                    }
                    len--;
                }
                no = str.split('').reverse().join('');
                displCaptured = displCaptured.join('');
            }
            console.log('no after parse..', no);
            switch (operationCaptured) {
                case '+': valueCaptured = Number(valueCaptured) + Number(no); break;
                case '-': valueCaptured = Number(valueCaptured) - Number(no); break;
                case '/': valueCaptured = Number(valueCaptured) / Number(no); break;
                case '*': valueCaptured = Number(valueCaptured) * Number(no); break;
                default:
                    valueCaptured = '';
                    displCaptured = ' ';
                    operationCaptured = '';
                    break;
            }
            valueCaptured = valueCaptured.toString();
            // operationCaptured = '';
            // flag = false;

        } else {

            valueCaptured += no;
        }

    }
    console.log('displCaptured..', displCaptured);
    console.log('valueCaptured..', valueCaptured);
    if (document.getElementById('displayNos') && document.getElementById('calculate')) {
        document.getElementById('displayNos').innerHTML = displCaptured;
        document.getElementById('calculate').innerHTML = valueCaptured;
    }

}
