import { useState, useEffect } from "react";

interface Nota {
  id: number;
  titulo: string;
  conteudo: string;
}
function EditorDeNota({
  nota,
  onSalvar,
}: {
  nota: Nota | null;
  onSalvar: (notaAtualizada: Nota) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  useEffect(() => {
    if (nota) {
      setTitulo(nota.titulo);
      setConteudo(nota.conteudo);
    }
  }, [nota]);

  const handleSalvar = () => {
    if (!nota) return;

    const notaAtualizada = {
      ...nota,
      titulo,
      conteudo,
    };

    onSalvar(notaAtualizada);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Editar Nota</h1>

      <input
        type="text"
        value={titulo}
        placeholder="Título"
        onChange={(e) => setTitulo(e.target.value)}
        style={styles.input}
      />

      <textarea
        value={conteudo}
        placeholder="Edite o conteúdo..."
        onChange={(e) => setConteudo(e.target.value)}
        style={styles.textarea}
      ></textarea>

      <button onClick={handleSalvar} style={styles.botao}>
        Salvar Alterações
      </button>
    </div>
  );
}

function PreviewNota({ nota }: { nota: Nota | null }) {
  if (!nota)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Nenhuma nota selecionada.
      </p>
    );

  return (
    <div style={styles.preview}>
      <h2>{nota.titulo}</h2>
      <p>{nota.conteudo}</p>
    </div>
  );
}
export default function EditarNota() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [notaSelecionada, setNotaSelecionada] = useState<Nota | null>(null);
  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("notas") || "[]");
    setNotas(salvas);
    if (salvas.length > 0) setNotaSelecionada(salvas[0]);
  }, []);
  const atualizarNota = (nota: Nota) => {
    const novasNotas = notas.map((n) => (n.id === nota.id ? nota : n));
    setNotas(novasNotas);

    localStorage.setItem("notas", JSON.stringify(novasNotas));
    alert("Alterações salvas!");
  };

  return (
    <div style={styles.tela}>
      {/* Lista lateral */}
      <div style={styles.lista}>
        <h3>Minhas Notas</h3>

        {notas.map((n) => (
          <div
            key={n.id}
            style={{
              ...styles.itemLista,
              background:
                notaSelecionada?.id === n.id ? "#dce9ff" : "#ffffff",
            }}
            onClick={() => setNotaSelecionada(n)}
          >
            {n.titulo}
          </div>
        ))}
      </div>
      <EditorDeNota nota={notaSelecionada} onSalvar={atualizarNota} />
      <PreviewNota nota={notaSelecionada} />
    </div>
  );
}
const styles: any = {
  tela: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
  },

  lista: {
    width: "200px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
  },

  itemLista: {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "8px",
  },

  container: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },

  titulo: {
    textAlign: "center",
    marginBottom: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  },

  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    minHeight: "120px",
    marginBottom: "10px",
  },

  botao: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },

  preview: {
    width: "300px",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    background: "#fff",
  },
};
