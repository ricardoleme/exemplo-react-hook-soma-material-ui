import React from 'react'
import {render, cleanup, fireEvent } from '@testing-library/react'
import App from "./App"

describe("UI Mini Calculadora",() => {
    afterEach(cleanup)
    //snapshot __snapshots__
    it("Verificamos se os componentes estarão iguais ao último snapshot", () => {
        const { asFragment } = render(<App/>)
        expect(asFragment(<App />)).toMatchSnapshot()
    })

    test("Efetua a soma de dois números inteiros", () => {
        const { getByTestId, queryByText} = render(<App />)
        //Confirmamos os textos iniciais dos Labels e do botão
        expect(queryByText("Número 1")).toBeTruthy()
        expect(queryByText("Número 2")).toBeTruthy()
        expect(queryByText("Calcular")).toBeTruthy()
        //Confirmamos o valor inicial no título da janela
        expect(global.window.document.title).toBe("")
        //Vamos obter os inputs
        const num1 = getByTestId("num1").querySelector('input')
        const num2 = getByTestId("num2").querySelector('input')
        const resultado = getByTestId("resultado").querySelector('input')
        const botaoSomar = getByTestId("calcular")
        //Verificamos se o foco inicia corretamente
        expect(num1).toBe(document.activeElement)
        //Verificamos se todos os campos iniciaram vazios
        expect(num1.value).toBe("")
        expect(num2.value).toBe("")
        expect(resultado.value).toBe("")
        //Verificamos se o botão inicia desabilitado
        expect(resultado.disabled).toBe(true)
        //através do fireEvent iremos disparar o método onChange
        fireEvent.change(num1, {target: {value : 10}})
        fireEvent.change(num2, {target: {value : 20}})
        fireEvent.click(botaoSomar)
        //Verificamos se todos os valores foram alterados através do onChange
        expect(num1.value).toBe("10")
        expect(num2.value).toBe("20")
        //Confirmamos o resultado final
        expect(resultado.value).toBe("30.00")
        expect(queryByText("Cálculo efetuado com sucesso!")).toBeTruthy()

    })

    test("Efetua a soma de valores inválidos", () => {
        const { getByTestId, queryByText} = render(<App />)
        expect(queryByText("Número 1")).toBeTruthy()
        expect(queryByText("Número 2")).toBeTruthy()
        expect(queryByText("Calcular")).toBeTruthy()
        const num1 = getByTestId("num1").querySelector('input')
        const num2 = getByTestId("num2").querySelector('input')
        const resultado = getByTestId("resultado").querySelector('input')
        const calcular = getByTestId('calcular')
        expect(num1.value).toBe("")
        expect(num2.value).toBe("")
        expect(resultado.value).toBe("")
        expect(resultado.disabled).toBe(true)
        fireEvent.change(num1, {target: {value: "a"}})
        fireEvent.change(num2, {target: {value: 20}})
        fireEvent.click(calcular)
        expect(num1.value).toBe("a")
        expect(num2.value).toBe("20")
        expect(resultado.value).toBe("")
        expect(queryByText("Tanto o número 1 e o número 2 devem ser números válidos!")).toBeTruthy()
    })

})