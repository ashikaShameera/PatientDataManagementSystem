const md5 = require('crypto-js/md5');

module.exports.initiatePayment=async(req,res)=>{
    let merchantSecret  = 'MTgzMjQyNTAwNDI5NDQxMzU4ODkzOTAzMDAwMTY0MTUxNzM0NzAzMQ==';
    let merchantId      = '1224383';
    let orderId         = '***';
    let amount          = 1000;
    let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
    let currency        = 'LKR';
    let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
    
  return hash
   
}


