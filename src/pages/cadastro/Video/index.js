import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias.js';

// useHistory é para manipular a navegacao entre pagina
// pegando o historico

function CadastroVideo() {
    // çoda  com formulário
    // tem que chamar o userForm com se tivesse uma função {}
    // no fundo é um custom hook

    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({titulo})=>titulo)
    const { handleChange, values } = useForm({
        // valores iniciais
        titulo: 'Video padrão',
        url: 'https://www.youtube.com/watch?v=YFOBLyf2SG0',
        categoria: 'Front End',
    });

    // Usando hook para carregar categorias existentes
    // tentar refatorar essa funcao para que ela sirva para todo mundo
    useEffect(() => {
        categoriasRepository.getAll()
            .then((categorias) => {
                setCategorias(categorias);
            });
    }, []); // tem que por esse array vazio se não ele fica fazendo chamadas infinitas no banco

    console.log(categorias)


    return (
        <PageDefault>

            <h1>
                Cadastro de Video
      </h1>

            <form onSubmit={(event) => {
                // para travar o reload da página
                event.preventDefault();


                //pegando valor do id
                //escolha da categoria se igual a que ja existe retorna a que existe
                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                })

                // console.log(categoriaEscolhida)

                videosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId:categoriaEscolhida.id,
                })
                    .then(() => {
                        history.push('/');
                    });
            }}
            >

                <FormField
                    label="Titulo da Vídeo"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField
                    label="Categoria"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                    suggestions={categoryTitles}
                    
                />

                <Button type="submit">
                    Cadastrar
        </Button>

            </form>

            <Link to="/cadastro/categoria">
                Cadastrar Categoria
      </Link>
        </PageDefault>
    );
}

export default CadastroVideo;
