/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (Number.isInteger(balance) && balance > 0) {
    var newAccount = new Account(this.nextAccountNumber, holder);
    newAccount.deposit(balance);
    this.nextAccountNumber += 1;
    this.accounts.push(newAccount);
    return newAccount.number;
  }
  return null;
};

Bank.prototype.getAccount = function (number) {
  for (var i = 0; i < this.accounts.length; i++) {
    var currentAccount = this.accounts[i];
    if (number === currentAccount.number) {
      return currentAccount;
    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  var balance = 0;
  for (var i = 0; i < this.accounts.length; i++) {
    var accounts = this.accounts[i];
    balance += accounts.getBalance();
  }
  return balance;
};
