const soma = require("./soma");

describe("Função Soma", () => {
  test("Somando números inteiros", () => {
    expect(soma(4, 5)).toEqual("9.00");
    expect(soma(8, -15)).toEqual("-7.00");
  });

  test("Somando números reais", () => {
    expect(soma(4.32, 5)).toEqual("9.32");
    expect(soma(8.84, 15.54)).toEqual("24.38");
  });

  test("Somando string", () => {
    expect(soma("3", "6")).toEqual("9.00");
    expect(soma("14.33", "6.99")).toEqual("21.32");
  });

  test("Somando valores inválidos", () => {
    const num1 = "a";
    const num2 = 45;

    expect(() => {
      soma(num1, num2);
    }).toThrowError(Error("O parâmetro num1 tem que ser um número válido!"));

    expect(() => {
      soma(num2, num1);
    }).toThrowError(Error("O parâmetro num2 tem que ser um número válido!"));

    expect(() => {
      soma(null, null);
    }).toThrowError(Error("O parâmetro num1 tem que ser um número válido!"));
  });
});
