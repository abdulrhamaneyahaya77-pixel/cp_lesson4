import { MiniMaple } from "./miniMaple.js";

const m = new MiniMaple();

test("dérive 4*x^3 selon x", () => {
    expect(m.diff("4*x^3", "x")).toBe("12*x^2");
});

test("dérive 4*x^3 selon y (variable différente)", () => {
    expect(m.diff("4*x^3", "y")).toBe("0");
});

test("dérive 4*x^3 - x^2 selon x", () => {
    expect(m.diff("4*x^3 - x^2", "x")).toBe("12*x^2 - 2*x");
});

test("rejette une opération non autorisée", () => {
    expect(() => m.diff("sin(x)", "x")).toThrow("Opération non autorisée");
});
