import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(infosDoEvento) {
    // desconstruction
    const { value } = infosDoEvento.target;
    const getAttribute = infosDoEvento.target.getAttribute('name');
    setValue(
      getAttribute,
      value,
    );
  }

  useEffect(() => {
    console.log('Alo alo w brasil ');

    // vai demorar 4s para fazer algo na tela
    setTimeout(() => {
      const URL =window.location.hostname.includes('localhost')?'http://localhost:8080/categorias':"https://cssflix.herokuapp.com/categorias"
      
  //     var myHeaders = new Headers();

  // const myInit = { method: 'GET',
  //               headers: myHeaders,
  //               mode: 'cors',
  //               cache: 'default' };
  //           const myRequest = new Request(URL,myInit)

      
  //     fetch(myRequest)
  //     .then((respostaDoServidor)=>{
  //       return respostaDoServidor.json()
  //     })
  //     .then((respostaConvertidaEmObjeto)=>{
  //       console.log(respostaConvertidaEmObjeto)
  //       })

      fetch(URL)
      .then(async (respostaDoServidor)=>{
        const resposta = await respostaDoServidor.json()

       setCategorias([
         ...resposta,
       ])

      })

      // setCategorias([
      //   ...categorias,
      //   {
      //     Id: 1,
      //     nome: 'Crystyan',
      //     descricao: 'vai dormir',
      //   },
      //   {
      //     Id: 2,
      //     nome: 'Não quero dormir',
      //     descricao: 'vai dormir',
      //   },
      // ]);
    }, 2 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro Categoria:
        {values.nome}
      </h1>

      <form
        style={{ background: values.cor }}
        onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault(); // para inibir o carregamento
          setCategorias([
            ...categorias,
            values,
          ]);

          setValues(valoresIniciais);
        }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
        
        {categorias.length===0 && (
          <div>
            Loading...
          </div>
        )}

        <ul>
          {categorias.map((categoria) => (
            <li key={`${categoria.nome}`}>
              {categoria.nome}
            </li>
          ))}
        </ul>
      </form>
      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
