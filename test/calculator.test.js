const {
    add,
    subtract,
    multiply,
    divide
} = require("../src/calculator");

describe("Calculator - Addition", () => {
    test("adds two positive numbers", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("adds a negative number", () => {
        expect(add(5, -2)).toBe(3);
    });

    test("adds decimal numbers", () => {
        expect(add(1.5, 2.5)).toBe(4);
    });
});

describe("Calculator - Subtraction", () => {
    test("subtracts two numbers", () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test("returns a negative result", () => {
        expect(subtract(3, 8)).toBe(-5);
    });
});

describe("Calculator - Multiplication", () => {
    test("multiplies two numbers", () => {
        expect(multiply(4, 5)).toBe(20);
    });

    test("multiplying by zero returns zero", () => {
        expect(multiply(10, 0)).toBe(0);
    });

    test("multiplies decimal numbers", () => {
        expect(multiply(2.5, 2)).toBe(5);
    });
});

describe("Calculator - Division", () => {
    test("divides two numbers", () => {
        expect(divide(20, 4)).toBe(5);
    });

    test("divides decimal numbers", () => {
        expect(divide(7, 2)).toBe(3.5);
    });

    test("throws an error when dividing by zero", () => {
        expect(() => divide(10, 0))
            .toThrow("Cannot divide by zero");
    });
});