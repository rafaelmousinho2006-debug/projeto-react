import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 👈 necessário para o botão

interface Nota {
  titulo: string;
  conteudo: string;
}

export default function TelaVisualizar() {
  const [notas, setNotas] = useState<Nota[]>([]);

  useEffect(() => {
    const notasSalvas = localStorage.getItem("notas");

    if (notasSalvas) {
      setNotas(JSON.parse(notasSalvas));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notas Salvas</h1>

      {/* === BOTÃO PARA IR PARA CRIAR NOTA === */}
      <Link
        to="/criar"
        style={{
          display: "inline-block",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Criar Nova Nota
      </Link>

      {notas.length === 0 && <p>Nenhuma nota encontrada.</p>}

      {notas.map((nota, index) => (
        <div
          key={index}
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h2>{nota.titulo}</h2>
          <p>{nota.conteudo}</p>
        </div>
      ))}
    </div>
  );
}
