import { sum } from "./01";

// In order to use these variables in each test and also to prevent rewriting
let a: number, b: number;
beforeEach(() => {
  a = 1;
  b = 3;
});

test("Sum should be correct", () => {
  //data
  //   const a = 1,
  //     b = 3;

  //action
  const result = sum(a, b);

  //expect result
  expect(result).toBe(4);
});
