/**
 * Efetua a soma de dois números
 *
 * @author Ricardo Leme
 * @version 1.0
 * @param {num1} float
 * @param {num2} float
 * @returns {soma} float
 */

function soma(num1, num2) {
  /* 
  O método Number.isNaN() determina se o valor passado é NaN.
  A propriedade global NaN é um valor especial que significa 
  Not-A-Number (não é um número). 
  O método parseFloat() retorna NaN caso o valor não seja um número válido 
  */

  if (Number.isNaN(parseFloat(num1)))
    throw Error("O parâmetro num1 tem que ser um número válido!");
  if (Number.isNaN(parseFloat(num2)))
    throw Error("O parâmetro num2 tem que ser um número válido!");
  return (parseFloat(num1) + parseFloat(num2)).toFixed(2);
}

module.exports = soma;
