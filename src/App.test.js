import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";

/**
 * Instale os seguintes pacotes apenas no ambiente de desenvolvimento, utilizando -D
 * 
 * npm i @testing-library/react @testing-library/user-event @testing-library/jest-dom -d
 */

describe("Mini Calculadora", () => {
  afterEach(cleanup);
  //Será criada uma pasta __snapshots__ e um arquivo App.test.js.snap 
  it("Verificamos se o componente está igual ao último snapshot", () => {
    const { asFragment } = render(<App />)   
    expect(asFragment(<App />)).toMatchSnapshot()
  });

  test("Efetua a soma de dois números inteiros", () => {
    const { getByTestId, queryByText } = render(<App />)
    //Confirmamos os textos iniciais dos Labels e do botão
    expect(queryByText("Número 1")).toBeTruthy();
    expect(queryByText("Número 2")).toBeTruthy();
    expect(queryByText("Calcular")).toBeTruthy();
    //Confirmamos o valor definido no título da janela
    expect(global.window.document.title).toBe("");
    /*Como o TextField do Material-UI é uma abstração de 3 componentes: 
    FormControl, Label e Input. Devemos especificar o input através do querySelector
    */
    const num1 = getByTestId("num1").querySelector('input');
    const num2 = getByTestId("num2").querySelector('input');
    const resultado = getByTestId("resultado").querySelector('input');
    const botaoSomar = getByTestId("calcular")
    //Verificamos se o foco inicia no campo correto
    expect(num1).toBe(document.activeElement);
    //Verificamos se todos os campos iniciaram vazios
    expect(num1.value).toBe("");
    expect(num2.value).toBe("");
    expect(resultado.value).toBe("");
    //Verificamos se o botão inicia desabilitado
    expect(resultado.disabled).toBe(true)
    //Através do fireEvent iremos disparar o método onChange
    fireEvent.change(num1, {target: {value: 10}});
    fireEvent.change(num2, {target: {value: 20}});
    fireEvent.click(botaoSomar);
    //Verificamos se todos os valores foram alterados através do onChange
    expect(num1.value).toBe("10");
    expect(num2.value).toBe("20");
    //Confirmamos o resultado final
    expect(resultado.value).toBe("30.00");
    //Verificamos a mensagem final
    expect(queryByText("Cálculo efetuado com sucesso!")).toBeTruthy();    
  })

  test("Efetua a soma de valores inválidos", () => {
    const { getByTestId, queryByText } = render(<App />)
    //Confirmamos os textos iniciais dos Labels e do botão
    expect(queryByText("Número 1")).toBeTruthy();
    expect(queryByText("Número 2")).toBeTruthy();
    expect(queryByText("Calcular")).toBeTruthy();
    //Confirmamos o valor definido no título da janela
    expect(global.window.document.title).toBe("");
    /*Como o TextField do Material-UI é uma abstração de 3 componentes: 
    FormControl, Label e Input. Devemos especificar o input através do querySelector
    */
    const num1 = getByTestId("num1").querySelector('input');
    const num2 = getByTestId("num2").querySelector('input');
    const resultado = getByTestId("resultado").querySelector('input');
    const botaoSomar = getByTestId("calcular")
    //Verificamos se o foco inicia no campo correto
    expect(num1).toBe(document.activeElement);
    //Verificamos se todos os campos iniciaram vazios
    expect(num1.value).toBe("");
    expect(num2.value).toBe("");
    expect(resultado.value).toBe("");
    //Verificamos se o botão inicia desabilitado
    expect(resultado.disabled).toBe(true)
    //Através do fireEvent iremos disparar o método onChange
    fireEvent.change(num1, {target: {value: "a"}});
    fireEvent.change(num2, {target: {value: 20}});
    fireEvent.click(botaoSomar);
    //Verificamos se todos os valores foram alterados através do onChange
    expect(num1.value).toBe("a"); 
    expect(num2.value).toBe("20");
    //Confirmamos o resultado final
    expect(resultado.value).toBe("");
    //Verificamos a mensagem final
    expect(queryByText("Tanto o número 1 e o número 2 devem ser números válidos!")).toBeTruthy();    
  })

 
});
