//neb
var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();

//nebPay
var NebPay = require("nebpay");
var nebPay = new NebPay();

var serialNumber;
var callbackUrl = NebPay.config.mainnetUrl;
var nebConfigArr = {
    mainnet: {
        name: "主网",
        contractAddress: "n1xRasFfqYYaFdSKfiWGag6rAcUKTjvTTqG",
        txhash: "04222aa816c36a7895efd59256f4f2844fae253064ebc40c155266e3d6cc5220",
        host: "https://mainnet.nebulas.io",
        payhost: "https://pay.nebulas.io/api/mainnet/pay"
    },
    localhost: {
        name: "开发网",
        contractAddress: "n1fQAGgExe2BJwuBVEYZkgUfzx2Ufp9r3Kx",
        txhash: "6c9ebc2b9d1e5c6b035b05ba6448911d17599b2026c9d0bd504c372b5f8fe977",
        host: "http://172.18.255.36:8685",
        payhost: "http://172.18.255.36/api/pay"
    }
};
var DragenImgUrl = 'http://service.mtamer.com/monster';
nebConfig = nebConfigArr["mainnet"];










neb.setRequest(new nebulas.HttpRequest(nebConfig["host"]));

var contractAddress = nebConfig['contractAddress'] 

var userAddress = '' //用户钱包地址，默认为空

function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Chrome") > -1) {
        return true;
    } else {
        return false
    }
}

//校验是否装有钱包插件
function validateNaswallet() {
    if (typeof(webExtensionWallet) === "undefined") {
        return 'We need use chrome and install nasWallet extension.'
    } else if (!myBrowser()) {
        return 'We need use chrome and install nasWallet extension.'

    } else {
        return true
    }
}



// window.onload = () =>{
//     if (validateNaswallet() != 'yes') {
//         // alert(validateNaswallet())
//         return
//     }
// }

//查询交易能否执行
function call(contractAddress, value, callFunction, callArgs, callback) { //call查询调用函数，（合约地址，函数名，参数，回调）
    callArgs = JSON.stringify(callArgs)
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        // qrcode: {
        //     showQRCode: false
        // },
        // goods: {
        //     name: "test",
        //     desc: "test goods"
        // },
        listener: function(resp){
            if(resp instanceof Object && resp.result.indexOf('TypeError') < 0){
                callback && callback(resp)
            }
        }
    });
}


//发起交易
function pay(contractAddress, value, callFunction, callArgs, callback) { //合约交易调用函数，（合约地址，函数名，参数，回调）
    callArgs = JSON.stringify(callArgs)
    
    console.log(
        {
            contractAddress,value,callFunction,callArgs
        }
    )
    // call(contractAddress,value, callFunction, JSON.parse(callArgs), (data) => {
    //     if (typeof data === 'string') {
    //         alert(data)
    //     } else if (data.result.indexOf('Error') >= 0) {
    //         alert(data.result)
    //     } else {
            serialNumber = nebPay.call(contractAddress, value, callFunction, callArgs, {
                listener: function(resp){
                    if(resp instanceof Object){
                        callback && callback(resp)
                    }
                }
            });
            setTimeout(() => {
                onrefreshClick(serialNumber);
            }, 1000);
    //     }

    // })
}




//查询交易结果
function receipt(txhash,callback,errorback ){
    let receiptTimer =  setInterval(() =>{
         neb.api.getTransactionReceipt({
            hash: txhash
        }).then(function(resp) {
            if (resp.status == 1) {
                clearInterval(receiptTimer)
                callback(resp)
            }else if(resp.status === 0){
                clearInterval(receiptTimer)
                errorback && errorback(resp.execute_result)
                console.log(resp)
            }
        }).catch(function(err) {
            alert(err)
            errorback && errorback()
        });
    },10000)
   
}

// window.addEventListener('message', function(e) {
//     if (e.data && e.data.data) {
//         if (e.data.data.account) {
//             userAddress = e.data.data.account
//             console.log(userAddress)
//         }
//     } else {

//     }
// });

// function getWallectInfo(callback) { //get钱包地址
//     window.postMessage({
//         "target": "contentscript",
//         "data": {},
//         "method": "getAccount",
//     }, "*");
// }

// getWallectInfo()



function onrefreshClick(serialNumber) {
    nebPay.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
    .then(function(resp) {
        console.log('----------------queryPayInfo-resp-----------');
        console.log(resp);
    })
    .catch(function(err) {
        console.log('----------------queryPayInfo-err-----------');
        console.log(err);
    });
}




