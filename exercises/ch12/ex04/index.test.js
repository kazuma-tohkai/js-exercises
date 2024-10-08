import { primes, int, primeDecision } from "./index.js";

test("primes", () => {
  const prime = primes(int, primeDecision);
  expect(prime.next().value).toBe(2);
  expect(prime.next().value).toBe(3);
  expect(prime.next().value).toBe(5);
  expect(prime.next().value).toBe(7);
  expect(prime.next().value).toBe(11);
  expect(prime.next().value).toBe(13);
  expect(prime.next().value).toBe(17);
  expect(prime.next().value).toBe(19);
  expect(prime.next().value).toBe(23);
  expect(prime.next().value).toBe(29);
  expect(prime.next().value).toBe(31);
  expect(prime.next().value).toBe(37);
  expect(prime.next().value).toBe(41);
  expect(prime.next().value).toBe(43);
  expect(prime.next().value).toBe(47);
  expect(prime.next().value).toBe(53);
  expect(prime.next().value).toBe(59);
  expect(prime.next().value).toBe(61);
  expect(prime.next().value).toBe(67);
  expect(prime.next().value).toBe(71);
  expect(prime.next().value).toBe(73);
  expect(prime.next().value).toBe(79);
  expect(prime.next().value).toBe(83);
  expect(prime.next().value).toBe(89);
  expect(prime.next().value).toBe(97);
});
