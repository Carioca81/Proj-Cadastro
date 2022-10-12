import db from "../config";
import firestore,{addDoc,
                  collection,
                  deleteDoc,
                  doc,getDoc,
                  getDocs,
                  setDoc}
from 'firebase/firestore';

import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio{
    // é preciso criar um conversor pois classes não são automticamente convertidas para o firebase
    // o mesmo acontece com dados que são obtidos do firebase, os mesmos nã oestarão no formato de classe
    // assim precisa ser criado um conversor como abaixo.
    #conversor = {
        toFirestore(cliente: Cliente){
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        },
        fromFirestore(snapshot: firestore.QueryDocumentSnapshot, options: firestore.SnapshotOptions){
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }
    
    // Aqui é criada uma coleção
    #colecao = collection(db, 'clientes').withConverter(this.#conversor)
    // private colecao(){
    //     return collection(app,'clientes').withConverter(this.#conversor)
    // }


    // FUNÇÃO PARA SALVAR DADOS NO BANCO
    async salvar(cliente: Cliente): Promise<Cliente>{
        if(cliente?.id){//AQUI ALTERA DADOS DO BANCO
            await setDoc(doc(db,'clientes',cliente.id).withConverter(this.#conversor),cliente)
            return cliente
        }else{//AQUI SALVAMOS DADOS NOVOS NO BANCO pois dados que não têm id são novos
            const docRef = await addDoc(this.#colecao, cliente) // Recebe uma coleção e o dado a ser adocionado. Retorna um DocumentReference
            const doc = await getDoc(docRef) // Recebe um DocumentReference. Retorna um DocumentSnapshot
            return doc.data() //
        }
    }



    // FUNÇÃO PARA EXCLUIR DADOS DO BANCO
    async excluir(cliente: Cliente): Promise<void>{
        return await deleteDoc(doc(db,'clientes',cliente.id))
    }



    // FUNÇÃO PARA OBTER TODOS OS DADOS DO BANCO
    async obterTodos(): Promise<Cliente[]>{
        const query = await getDocs(this.#colecao) // Recebe uma coleção e devolve o resultado como uma QuerySnapshot que contém em sua
                                                   // propriedade 'docs' uma lista de QueryDocumentSnapshot
        const listaClientes = query.docs.map(doc => doc.data()) ?? [] // docs é uma lista de QueryDocumentSnapshot[]
                                                                      // cada 'doc' é um dado lido do banco de dados
                                                                      // o método data() retorna um objeto com todos os campos do documento
        return listaClientes
    }

}