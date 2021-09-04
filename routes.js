const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");

module.exports = function(app){

  const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algodPort = "";
  const algodToken = {
      'X-API-Key': "<API-KEY>"
  };

  const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);  


  app.get('/', function(req, res){
    
      res.render('algorandwar.html');
    
  });


  app.get('/user', function(req, res){

      (async() => {

        const passphrase = "<PASSPHRASE>";
    
        let myAccount = algosdk.mnemonicToSecretKey(passphrase)
        console.log("My address: %s", myAccount.addr)
    
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Account balance: %d microAlgos", accountInfo.amount);

        obj = {"pub2": myAccount.addr, "pub1": myAccount, "balance": accountInfo.amount};

        res.send(obj);
    
      })().catch(e => {
    
          console.log(e);
    
      });

  });


  app.get('/launchSmartContract', function(req, res){

    (async() => {
          let params = await algodClient.getTransactionParams();
          let endRound = params.lastRound + parseInt(1000);
          let owner = "<PUBLIC-KEY>";
          let receiver = "<RECEIVER-PUBLIC-KEY>";
          let hashFn = "sha256";
          let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
          let expiryRound = params.lastRound + 10000;
          let maxFee = 2000;
          
          let htlc = new HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
          let program = htlc.getProgram();
          console.log("htlc addr: " + htlc.getAddress());

          let args = ["hero wisdom green split loop element vote belt"];
          let lsig = algosdk.makeLogicSig(program, args);

            let txn = {
                "from": htlc.getAddress(),
                "to": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
                "fee": 1,
                "type": "pay",
                "amount": 0,
                "firstRound": params.lastRound,
                "lastRound": endRound,
                "genesisID": params.genesisID,
                "genesisHash": params.genesishashb64,
                "closeRemainderTo": "UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY"
            };

            let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

            let tx = (await algodClient.sendRawTransaction(rawSignedTxn.blob));
            console.log("Transaction : " + tx.txId);
        })().catch(e => {
            console.log(e);
      });

  });
  
};
