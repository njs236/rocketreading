describe ( "to test my comprehension", function () {
  it("is below 2 seconds", function() {
    expect(selectWord("I")).toequal("I");
  });
  it("is between 2 and 4 seconds", function() {
    expect(selectWord("I")).toEqual("I")
  });
  it("is between 4 and 8 seconds", function() {
    expect(selectWord("I")).toEqual("I")
  });
  it("is incorrect word", function() {
    expect(selectWord("I")).not.toEqual("am")
  });
  it("is over 8s", function() {
    expect(selectWord("I")).toEqual("I")
  });
});