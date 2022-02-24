const ChangeHanlder = require("../src/tdd-lab2");

describe("ChangeHandler constructor", () => {
  test("Amount due is set based on an argument", () => {
    const changeHandlerObj = new ChangeHanlder(10);
    expect(changeHandlerObj.amountDue).toBe(10);
  });
  test("Amount due is set based on an argument", () => {
    const changeHandlerObj = new ChangeHanlder(10);
    expect(changeHandlerObj.cashTendered).toBe(0);
  });
});

describe("insertCoin method", () => {
  test("inserting a quarter adds 25", () => {
    const changeHandlerObj = new ChangeHanlder(25);
    changeHandlerObj.insertCoin("quarter");
    expect(changeHandlerObj.cashTendered).toBe(25);
  });
  test("inserting two quarter adds 25", () => {
    const changeHandlerObj = new ChangeHanlder(25);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    expect(changeHandlerObj.cashTendered).toBe(50);
  });
  test("inserting a quarter adds 10", () => {
    const changeHandlerObj = new ChangeHanlder(25);
    changeHandlerObj.insertCoin("dime");
    expect(changeHandlerObj.cashTendered).toBe(10);
  });
  test("inserting a quarter adds 5", () => {
    const changeHandlerObj = new ChangeHanlder(25);
    changeHandlerObj.insertCoin("nickel");
    expect(changeHandlerObj.cashTendered).toBe(5);
  });
  test("inserting a quarter adds 1", () => {
    const changeHandlerObj = new ChangeHanlder(25);
    changeHandlerObj.insertCoin("penny");
    expect(changeHandlerObj.cashTendered).toBe(1);
  });
});

describe("isPaymentSufficent method", () => {
  test("if cashTendered is more than amountDue", () => {
    const changeHandlerObj = new ChangeHanlder(20);
    changeHandlerObj.insertCoin("quarter");
    expect(changeHandlerObj.isPaymentSufficent()).toBe(true);
  });
  test("if cashTendered is less than amountDue", () => {
    const changeHandlerObj = new ChangeHanlder(50);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("dime");
    expect(changeHandlerObj.isPaymentSufficent()).toBe(false);
  });
  test("if cashTendered is equal amountDue", () => {
    const changeHandlerObj = new ChangeHanlder(75);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("dime");
    changeHandlerObj.insertCoin("nickel");
    changeHandlerObj.insertCoin("dime");
    expect(changeHandlerObj.isPaymentSufficent()).toBe(true);
  });
});

describe("giveChange", () => {
  test("getting back 32 cents", () => {
    const changeHandlerObj = new ChangeHanlder(75);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("nickel");
    changeHandlerObj.insertCoin("penny");
    changeHandlerObj.insertCoin("penny");
    expect(changeHandlerObj.giveChange()).toEqual({
      quarter: 1,
      dime: 0,
      nickel: 1,
      penny: 2,
    });
  });
  test("getting back 10 cents", () => {
    const changeHandlerObj = new ChangeHanlder(10);
    changeHandlerObj.insertCoin("dime");
    changeHandlerObj.insertCoin("nickel");
    changeHandlerObj.insertCoin("nickel");
    expect(changeHandlerObj.giveChange()).toEqual({
      quarter: 0,
      dime: 1,
      nickel: 0,
      penny: 0,
    });
  });
  test("getting back 27 cents", () => {
    const changeHandlerObj = new ChangeHanlder(79);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("nickel");
    changeHandlerObj.insertCoin("penny");

    expect(changeHandlerObj.giveChange()).toEqual({
      quarter: 1,
      dime: 0,
      nickel: 0,
      penny: 2,
    });
  });
  test("getting back 68 cents", () => {
    const changeHandlerObj = new ChangeHanlder(45);
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("quarter");
    changeHandlerObj.insertCoin("dime");
    changeHandlerObj.insertCoin("penny");
    changeHandlerObj.insertCoin("penny");
    changeHandlerObj.insertCoin("penny");

    expect(changeHandlerObj.giveChange()).toEqual({
      quarter: 2,
      dime: 1,
      nickel: 1,
      penny: 3,
    });
  });
});
