const algosdk = require('algosdk');

module.exports = function(app){

  const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algodPort = "";
  const algodToken = {
      'X-API-Key': "X7HxsshAnN626baE6sNP9963GCwayNPXamoGg3fy"
  };

  const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);  


  app.get('/', function(req, res){
    
      res.render('algorandwar.html');
    
  });


  app.get('/user', function(req, res){

      (async() => {

        const passphrase = "wedding cash year brass wash usual gift toy afford neither august usual lazy federal patient room select gather example trick desert bid scout absorb approve";
    
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

    /* (async() => {
          // Get the relevant params from the algod for the network
          let params = await algodClient.getTransactionParams();
          let endRound = params.lastRound + parseInt(1000);
          // let fee = await algodClient.suggestedFee();
          // // Inputs
          let owner = "Q6TFA4OOEHYOQFFHQU3O26WEB5C5R4UUPH3KXIJ3FMGBMLQW3RDAOF3K7U";
          let receiver = "UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY";
          let hashFn = "sha256";
          let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
          let expiryRound = params.lastRound + 10000;
          let maxFee = 2000;
          // Instaniate the template
          let htlc = new HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
          // Outputs
          let program = htlc.getProgram();
          console.log("htlc addr: " + htlc.getAddress());

          // Get the program and parameters and use them to create an lsig
          // For the contract account to be used in a transaction
          // In this example 'hero wisdom green split loop element vote belt' hashed with sha256 will produce our image hash
          // that was configured in step 1
          // This is the passcode for the HTLC   
          // python -c "import hashlib;print(hashlib.sha256('hero wisdom green split loop element vote belt').digest().encode('base64'))"  
          let args = ["hero wisdom green split loop element vote belt"];
          let lsig = algosdk.makeLogicSig(program, args);

          //create a transaction
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
            // create logic signed transaction.
            let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

            //Submit the lsig signed transaction
            let tx = (await algodClient.sendRawTransaction(rawSignedTxn.blob));
            console.log("Transaction : " + tx.txId);
        })().catch(e => {
            console.log(e);
      }); */

  });
  
};