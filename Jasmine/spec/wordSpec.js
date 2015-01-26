describe("Word", function() {
	it("should be of a list", function() {
		var list = new List();
		var word = new Word(list);
		expect(list.word).toBe(word);
	});
});