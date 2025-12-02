import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ButtonVoltarEditar from "../components/Button_voltarEditar"; // ajuste o caminho se necessário

interface Nota {
  id: number;
  titulo: string;
  conteudo: string;
}

export default function CriarNota() {
  const [titulo, setTitulo] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [notas, setNotas] = useState<Nota[]>([]);

  // Carrega notas do localStorage
  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem("notas") || "[]");
    setNotas(notasSalvas);
  }, []);

  // Salvar nova nota
  const handleSalvar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (titulo.trim() === "" || conteudo.trim() === "") {
      setErro("Preencha todos os campos!");
      return;
    }

    const novaNota: Nota = {
      id: Date.now(),
      titulo,
      conteudo,
    };

    const novasNotas = [...notas, novaNota];
    setNotas(novasNotas);
    localStorage.setItem("notas", JSON.stringify(novasNotas));

    setMensagem("Nota salva com sucesso!");
    setTitulo("");
    setConteudo("");
  };

  // Excluir nota
  const handleExcluir = (id: number) => {
    const novasNotas = notas.filter((nota) => nota.id !== id);
    setNotas(novasNotas);
    localStorage.setItem("notas", JSON.stringify(novasNotas));
  };

  return (
    <div className="container">
      <h1 className="titulo">Criar Nova Nota</h1>

      <form onSubmit={handleSalvar} className="form">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitulo(e.target.value)
          }
          className="input"
        />

        <textarea
          placeholder="Conteúdo da nota..."
          value={conteudo}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setConteudo(e.target.value)
          }
          className="textarea"
        ></textarea>

        <button type="submit" className="botao">
          Salvar
        </button>

        {erro && <p className="erro">{erro}</p>}
        {mensagem && <p className="sucesso">{mensagem}</p>}
      </form>

      {/* Botão para navegar até EditarNota */}
      <ButtonVoltarEditar destino="/" texto="Ir para Editar Nota" />

      <div className="lista">
        <h2>Minhas Notas</h2>
        {notas.length === 0 ? (
          <p>Nenhuma nota criada ainda.</p>
        ) : (
          notas.map((nota) => (
            <div key={nota.id} className="nota">
              <h3>{nota.titulo}</h3>
              <p>{nota.conteudo}</p>
              <button
                onClick={() => handleExcluir(nota.id)}
                className="botao"
                style={{ backgroundColor: "red" }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #f9f9f9;
          font-family: Poppins, sans-serif;
        }

        .titulo {
          text-align: center;
          margin-bottom: 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input, .textarea {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .textarea {
          min-height: 100px;
        }

        .botao {
          background-color: #007bff;
          color: #fff;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .erro {
          color: red;
          text-align: center;
        }

        .sucesso {
          color: green;
          text-align: center;
        }

        .lista {
          margin-top: 30px;
        }

        .nota {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
