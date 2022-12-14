import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import ClienteRepositorio from '../core/ClienteRepositorio'
import ColecaoCliente from '../backend/db/ColecaoCliente'
import useClientes from '../hooks/useClientes'
import useTabelaOuForm from '../hooks/useTabelaOuForm'

export default function Home() {

  const { cliente,
          clientes,
          novoCliente,
          salvarCliente,
          selecionarCliente,
          excluirCliente,
          tabelaVisivel,
          exibirTabela
        } = useClientes()
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
        <Layout titulo="Cadastro Simples">
          {tabelaVisivel ? (
            <>
              <div className="flex justify-end">
                <Botao
                  cor = 'green'
                  className='mb-4'
                  onClick={() => novoCliente(cliente)}
                >Novo Cliente</Botao>
              </div>
              <Tabela clientes={clientes}
                clienteSelecionado={selecionarCliente}
                clienteExcluido={excluirCliente}
              ></Tabela>
            </>
          ) : (

            <Formulario 
              cliente={cliente}
              clienteMudou={salvarCliente}
              cancelado={exibirTabela}
            />
          )}
        </Layout>
    </div>
  )
}
