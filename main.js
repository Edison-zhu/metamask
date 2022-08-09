const {ethers,utils} = require('ethers');
const fs = require('fs');
//以太节点
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/de08a5f2792f46b1a26d74b31ac9d0e3') //

//助记词
const mnemonic = '';

const hdNode = utils.HDNode.fromMnemonic(mnemonic);


deriviation = {
    metamask : "m/44'/60'/0'/0/",
    ledger : "m/44'/60'/"

}

//账户个数
const tries = 25;

async function getAccount(){
    for(let i=0;i<tries;i++){
        let path = deriviation.metamask + i;
        console.log(path)
        let a = hdNode.derivePath(path);
        console.log(a.address)
        const balance = await provider.getBalance(a.address)
        const content = a.address + "\n" + ethers.utils.formatEther(balance) + "\n";
        fs.appendFile('address.txt', content, err =>{
            if(err){
                console.error(err);}});
        if(a.address == '0x4b101511c4f8376A7039Af5ef669703a0AE5677b'){
            console.log(a.address)
            console.log(a.privateKey)
        }
    }
}
getAccount()
