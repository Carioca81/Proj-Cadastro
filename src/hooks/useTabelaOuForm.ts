import { useState } from 'react'

export default function useTabelaOuForm(){
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    const tabelaVisivel = (visivel === 'tabela')
    const formularioVisivel = (visivel === 'form')

    const exibirTabela = () => setVisivel('tabela')
    const exibirFormulario = () => setVisivel('form')

    return {
        tabelaVisivel,
        formularioVisivel,
        exibirTabela,
        exibirFormulario
    }
}