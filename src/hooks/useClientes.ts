import { useEffect, useState } from "react"
import ClienteRepositorio from "../core/ClienteRepositorio"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes(){

    const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
//   const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const {
    exibirTabela,
    exibirFormulario,
    tabelaVisivel
  } = useTabelaOuForm()
  
  useEffect(obterTodos,[])

  function obterTodos(){
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      exibirTabela()
    //   setVisivel('tabela')
    })
  }

  function selecionarCliente(cliente: Cliente){
      // console.log(cliente.nome)
      setCliente(cliente)
      exibirFormulario()
    //   setVisivel('form')
  }
  
  async function excluirCliente(cliente: Cliente){
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente){
    // console.log(cliente)
    await repo.salvar(cliente)
    obterTodos()
  }

  function novoCliente(cliente: Cliente){
    setCliente(Cliente.vazio())
    exibirFormulario()
    // setVisivel('form')
  }

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    selecionarCliente,
    excluirCliente,
    obterTodos,
    tabelaVisivel,
    exibirTabela
  }
}