import Entrada from './Entrada'
import {useState} from 'react'
import Cliente from '../core/Cliente'
import Botao from './Botao'

interface FormularioProps{
    // texto: string
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}
export default function Formulario(props: FormularioProps){
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? '')
    const id = props.cliente?.id
    return (
        <div>
            {id ?
                <Entrada
                    somenteLeitura
                    texto="Código"
                    valor={id}
                    className='mb-5'
                />
                :
                false
            }
           <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-5"
            />
           <Entrada
                texto="Idade"
                tipo='number'
                valor={idade}
                valorMudou={setIdade}
            />
            <div className='flex justify-end mt-3'>
                <Botao cor="blue"
                    className='mr-2'
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
                >{id ? 'Alterar' : 'Salvar'}</Botao>
                <Botao onClick={props.cancelado}>Cancelar</Botao>
            </div>
        </div>
    )
}