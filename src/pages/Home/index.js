
import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu'
// import dadosIniciais from '../../data/dados_iniciais.json'
import BannerMain from '../../components/BannerMain'
import Carousel from '../../components/Carousel'
import Footer from '../../components/Footer'
import categoriasRepository from '../../repositories/categorias'
import PageDefault from '../../components/PageDefault'

function Home() {

  const [dadosInicias, setDadosIniciais] = useState([])

  useEffect(() => {
    categoriasRepository.getAllWinthVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos)
      })
      .catch((err) => {
        //o certo é pegar o erro 
        //atráves da resposta do status e tratá-lo
        console.log(err.message)
      })
  }, [])

  return (
    <PageDefault paddingAll={0}>
      {dadosInicias.length === 0 && (<div>Loading...</div>)}

      {dadosInicias.map((categoria, indice)=>{
        if(indice===0){
          return (
            <div key={categoria.id}>
              <BannerMain
              videoTitle={dadosInicias[0].videos[0].titulo}
              url={dadosInicias[0].videos[0].url}
              videoDescription="O que é Front-end"
              />

              <Carousel
                ignoreFirstVideo
                category={dadosInicias[0]}
                />
            </div>
          )
        }
 
        return (
          <Carousel
          key={categoria.id}
          category={categoria}
          />
        )
      })}

        

    </PageDefault>
  );
}

export default Home;