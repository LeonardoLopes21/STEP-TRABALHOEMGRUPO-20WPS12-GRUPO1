import styles from './Home.module.css'

function Home() {
    return (
      <div className="page">

        <h1>A melhor loja de games da região!</h1>

        <p className={styles.textointroducao}>
          Seja bem-vindo a melhor loja de games da região. Somos especializados em games para as plataformas da Sony, mas também possuímos materiais de outros consoles disponíveis no mercado. Desde games atuais e lançamentos a games raros e de plataformas mais antigas você encontrará um produto que irá te agradar!
        </p>

        <p className={styles.textointroducao}>
          Temos jogos de diversos gêneros, sendo os principais:
          <ul>
            <li>Ação</li>
            <li>Estratégia</li>
            <li>RPG</li>
            <li>Esportes</li>
          </ul>
        </p>

        <p className={styles.textointroducao}>
          Caso você encontre um preço melhor em alguma outra loja da região nós cobrimos o valor com desconto de 5%.
        </p>
        
        <div>
          <img className={styles.imagemintroducao1} src={"https://media.timeout.com/images/103377921/image.jpg"} />
        </div>

        <br/>

        <h3>Atualmente possuímos games das seguintes plataformas:</h3>

        <div className={styles.listaPlataformas}>
          <ul>
            <li>Xbox 360</li>
            <li>Xbox One</li>
            <li>PlayStation 2</li>
            <li>PlayStation 3</li>
            <li>PlayStation 4</li>
            <li>PlayStation 5</li>
            <li>Nintendo DS</li>
            <li>Nintendo Wii</li>
            <li>Nintendo Switch</li>
          </ul>
        </div>

        <br/>

        <div style={{marginBottom: '200px'}}>

        <h4 className={styles.textointroducao}>
          Nosso Objetivo:
        </h4>

        <p className={styles.textointroducao}>
          Temos como objetivo fornecer os melhores games para os nossos clientes, sejam eles novos ou antigos, para que a paixão por esses itens continue se fortalecendo de geração para geração.
        </p>

        <p className={styles.textointroducao}>
          Acreditamos que os games são capazes de levar diversão para toda a família. Reunir todos para passar uma tarde jogando é uma das melhores atividades possíveis para entreter a todos.
        </p>

        <p className={styles.textointroducao}>
          Uma das grandes vantagens deste hobby é que ele auxilia no desenvolvimento do raciocínio do jogador, além de em muitos casos testar a paciência e resiliência do player ao enfrentar diversos desafios e ter a dificuldade gradualmente elevada.
        </p>
        
        <div>
          <img className={styles.imagemintroducao2} src={"https://www.healthychildren.org/SiteCollectionImagesArticleImages/family-playing-video-games-together-at-home2.jpg?RenditionID=3"} />
        </div>

        {/* colocar alguma igmagem de supermercado ou alguma historia */}

      </div>

      </div>
    );
  }
  
  export default Home;
