import React, { useState, useEffect } from "react";

function NotaCard({ nota, onView, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{nota.titulo || "Sem título"}</h3>
        <small style={{ opacity: 0.7 }}>{new Date(nota.criadoEm).toLocaleString()}</small>
      </div>
      <p style={styles.cardBody}>{nota.conteudo?.slice(0, 150) || <i>(sem conteúdo)</i>}</p>
      <div style={styles.cardFooter}>
        <button style={styles.btnLink} onClick={() => onView(nota.id)}>Visualizar</button>
        <div>
          <button style={styles.btn} onClick={() => onEdit(nota.id)}>Editar</button>
          <button style={{ ...styles.btn, ...styles.btnDanger }} onClick={() => onDelete(nota.id)}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------- ConfirmModal ------------------- */
function ConfirmModal({ aberto, mensagem, onConfirm, onCancel }) {
  if (!aberto) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <p style={{ marginBottom: 20 }}>{mensagem}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button style={styles.btn} onClick={onCancel}>Cancelar</button>
          <button style={{ ...styles.btn, ...styles.btnDanger }} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

/* --------------------- Dashboard --------------------- */
export default function Dashboard({ onCreate = () => {}, onEdit = () => {}, onView = () => {} }) {
  // hooks (4): notes, modal, notification, efeito para persistência
  const [notas, setNotas] = useState([]);
  const [modal, setModal] = useState({ aberto: false, idParaExcluir: null });
  const [notif, setNotif] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notas_digitais_v1");
      if (raw) setNotas(JSON.parse(raw));
    } catch (e) {
      console.error("Falha ao carregar notas:", e);
    }
  }, []);

  // Save to localStorage whenever notas mudam
  useEffect(() => {
    try {
      localStorage.setItem("notas_digitais_v1", JSON.stringify(notas));
    } catch (e) {
      console.error("Falha ao salvar notas:", e);
      setNotif({ tipo: "erro", texto: "Erro ao salvar notas localmente." });
    }
  }, [notas]);

  /* Handlers */
  function handleCreate() {
    onCreate();
  }

  function handleView(id) {
    onView(id);
  }

  function handleEdit(id) {
    onEdit(id);
  }

  function confirmarExcluir(id) {
    setModal({ aberto: true, idParaExcluir: id });
  }

  function cancelarExcluir() {
    setModal({ aberto: false, idParaExcluir: null });
  }

  function efetivarExcluir() {
    const id = modal.idParaExcluir;
    setNotas(prev => prev.filter(n => n.id !== id));
    setModal({ aberto: false, idParaExcluir: null });
    setNotif({ tipo: "sucesso", texto: "Nota excluída." });
    // limpar notificação depois de 2s
    setTimeout(() => setNotif(null), 2000);
  }

  /* UI: se não houver notas, mostrar chamada à ação */
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Notas</h1>
          <small style={{ opacity: 0.7 }}>Organize suas ideias aqui!</small>
        </div>
        <div>
          <button style={{ ...styles.btn, marginRight: 8 }} onClick={handleCreate}>+ Criar Nota</button>
          <button style={styles.btn} onClick={() => {
            // quick sample: criar nota de exemplo
            const nova = {
              id: Date.now().toString(),
              titulo: "Nota de exemplo",
              conteudo: "Escreva algo aqui...",
              criadoEm: Date.now()
            };
            setNotas(prev => [nova, ...prev]);
            setNotif({ tipo: "sucesso", texto: "Nota de exemplo criada." });
            setTimeout(() => setNotif(null), 2000);
          }}>Gerar Exemplo</button>
        </div>
      </header>

      <main style={{ padding: 16 }}>
        {notas.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: 18, marginBottom: 8 }}>Você ainda não tem notas.</p>
            <p style={{ marginTop: 0, opacity: 0.8 }}>Clique em "Criar Nota" para adicionar sua primeira nota rápida.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {notas.map(nota => (
              <NotaCard
                key={nota.id}
                nota={nota}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={confirmarExcluir}
              />
            ))}
          </div>
        )}
      </main>

      {/* footer simples */}
      <footer style={styles.footer}>
        <small style={{ opacity: 0.7 }}>Notas Digitais — versão simples</small>
      </footer>

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        aberto={modal.aberto}
        mensagem="Deseja realmente excluir esta nota? Esta ação não pode ser desfeita."
        onConfirm={efetivarExcluir}
        onCancel={cancelarExcluir}
      />

      {/* Notificação simples */}
      {notif && (
        <div style={{ ...styles.toast, ...(notif.tipo === "erro" ? styles.toastError : styles.toastSuccess) }}>
          {notif.texto}
        </div>
      )}
    </div>
  );
}

/* --------------------- Estilos (inline simples) --------------------- */
const styles = {
  container: {
    maxWidth: 1100,
    margin: "24px auto",
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(10,10,10,0.06)",
    overflow: "hidden",
    background: "#fff",
    fontFamily: "Inter, Roboto, system-ui, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottom: "1px solid #eee"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16
  },
  card: {
    background: "#fff9",
    border: "1px solid #eee",
    padding: 14,
    borderRadius: 10,
    minHeight: 140,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8
  },
  cardBody: {
    flex: 1,
    marginTop: 6,
    marginBottom: 12,
    color: "#222",
    lineHeight: 1.3,
    overflow: "hidden"
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  btn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#0b5cff",
    color: "#fff",
    fontSize: 14
  },
  btnDanger: {
    background: "#e23d3d"
  },
  btnLink: {
    background: "transparent",
    border: "none",
    color: "#0b5cff",
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
    fontSize: 14
  },
  footer: {
    padding: 12,
    borderTop: "1px solid #f2f2f2",
    textAlign: "center"
  },
  empty: {
    padding: 40,
    textAlign: "center",
    color: "#333"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.35)"
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    minWidth: 320,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
  },
  toast: {
    position: "fixed",
    right: 20,
    bottom: 20,
    padding: "10px 14px",
    borderRadius: 8,
    color: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
  },
  toastSuccess: {
    background: "#16a34a"
  },
  toastError: {
    background: "#ef4444"
  }
};
