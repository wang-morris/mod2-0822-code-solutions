/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  var transaction = new Transaction('deposit', amount);
  if (Number.isInteger(transaction.amount) && transaction.amount > 0) {
    this.transactions.push(transaction);
    return true;
  }
  return false;
};

Account.prototype.withdraw = function (amount) {
  var withdrawal = new Transaction('withdrawal', amount);
  if (Number.isInteger(withdrawal.amount) && withdrawal.amount > 0) {
    this.transactions.push(withdrawal);
    return true;
  }
  return false;
};

Account.prototype.getBalance = function () {
  var totalDeposit = 0;
  var totalWithdrawal = 0;
  var balance = 0;
  for (var i = 0; i < this.transactions.length; i++) {
    var transaction = this.transactions[i];
    if (transaction.type === 'deposit') {
      totalDeposit += transaction.amount;
    } else if (transaction.type === 'withdrawal') {
      totalWithdrawal += transaction.amount;
    }
    balance = totalDeposit - totalWithdrawal;
  }
  return balance;
};
