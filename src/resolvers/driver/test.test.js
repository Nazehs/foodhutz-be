const indexOf = jest.spyOn(Array.prototype, "indexOf");
it("Driver", () => {
  expect(indexOf).not.toBeCalled();
});
test("stub .toBeCalled()", () => {
  const stub = jest.fn();
  stub();
  expect(stub).toBeCalled();
});
