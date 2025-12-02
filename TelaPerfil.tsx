import Header from "../components/Header"; 
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function TelaPerfil() {
  return (
    <div className="perfil-container">

      <section className="perfil-box">
        <Header />

        <img
          src="https://via.placeholder.com/140"
          alt="avatar"
          className="perfil-avatar"
        />

        <h2 className="perfil-username">Usuário Convidado</h2>
        <p className="perfil-description">
          Organize suas ideias usando notas rápidas e simples.
        </p>
      </section>

      <section className="perfil-instrucoes">
        <h3>Como usar o aplicativo:</h3>
        <ul>
          <li>Clique em “Criar Nota” para adicionar algo novo.</li>
          <li>Toque em uma nota para visualizar o conteúdo.</li>
          <li>Dentro da nota, clique em “Editar”.</li>
          <li>Para excluir, toque na lixeira ou no menu.</li>
          <li>Use o menu superior para voltar ao início.</li>
        </ul>

        <div className="botao-container">
          <Button />
        </div>

        <Footer />
      </section>

      <style>{`
        body {
          background: linear-gradient(135deg, #fff8e7, #f0faff);
          margin: 0;
          padding: 0;
        }

        .perfil-container {
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          max-width: 650px;
          margin: 60px auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }

        header h1 {
          text-align: center;
          padding: 20px 0;
        }

        .perfil-box {
          text-align: center;
          background: #f5f5f5;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
        }

        .perfil-avatar {
          border-radius: 50%;
          margin-bottom: 10px;
          border: 3px solid #ffd45c;
          transition: transform 0.3s;
        }

        .perfil-avatar:hover {
          transform: scale(1.05);
        }

        .perfil-username {
          margin: 10px 0 5px 0;
          color: #222;
        }

        .perfil-description {
          color: #555;
          font-size: 15px;
        }

        .perfil-instrucoes {
          background: #fff7cc;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
        }

        .perfil-instrucoes h3 {
          color: #333;
          margin-top: 0;
        }

        .perfil-instrucoes li {
          margin-bottom: 8px;
        }

        Footer, .perfil-footer {
          text-align: center;
          color: #777;
          margin-top: 30px;
          font-size: 14px;
        }

        Button {
          text-align: center;
          display: inline-block;
          background-color: #6c63ff; 
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;       
          transition: background-color 0.3s, transform 0.2s;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }

        .botao-voltar {
          display: inline-block;
          background-color: #6c63ff;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0px 4px 10px rgba(108, 99, 255, 0.3);
          margin-top: 20px;
        }

        .botao-voltar:hover {
          background-color: #574bff;
          transform: scale(1.05);
          box-shadow: 0px 6px 12px rgba(108, 99, 255, 0.4);
        }

        .botao-voltar:active {
          background-color: #453bdb;
          transform: scale(0.97);
        }

        .botao-container {
          text-align: center;
          margin-top: 30px;
        }

      `}</style>

    </div>
  );
}
