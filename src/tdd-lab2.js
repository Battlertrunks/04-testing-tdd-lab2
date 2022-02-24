class ChangeHanlder {
  constructor(amountDue) {
    this.amountDue = amountDue;
    this.cashTendered = 0;
  }
  insertCoin(type) {
    if (type === "quarter") this.cashTendered += 25;
    else if (type === "dime") this.cashTendered += 10;
    else if (type === "nickel") this.cashTendered += 5;
    else if (type === "penny") this.cashTendered += 1;
  }

  isPaymentSufficent() {
    if (this.cashTendered > this.amountDue) return true;
    else if (this.cashTendered < this.amountDue) return false;
    else return true;
  }

  giveChange() {
    const totalBack = this.cashTendered - this.amountDue;
    let givingBack = 0;
    const changeObj = {
      quarter: 0,
      dime: 0,
      nickel: 0,
      penny: 0,
    };
    while (totalBack > givingBack) {
      if (25 + givingBack <= totalBack) {
        changeObj.quarter++;
        givingBack += 25;
      } else if (10 + givingBack <= totalBack) {
        changeObj.dime++;
        givingBack += 10;
      } else if (5 + givingBack <= totalBack) {
        changeObj.nickel++;
        givingBack += 5;
      } else if (1 + givingBack <= totalBack) {
        changeObj.penny++;
        givingBack += 1;
      }
    }
    return changeObj;
  }
}

module.exports = ChangeHanlder;
