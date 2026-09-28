import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FeedbackToast } from "../../components/feedback";
import { useFeedback } from "../../hooks/useFeedback";
import { FiTrash } from "react-icons/fi";
import { auth, db } from "../../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore"

interface LinkProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#F1F1F1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [profileName, setProfileName] = useState("");
  const { message, showFeedback } = useFeedback();

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setProfileName("");
        return;
      }

      getDoc(doc(db, "profiles", user.uid))
        .then((snapshot) => setProfileName(snapshot.data()?.name ?? ""))
        .catch(() => showFeedback("Não foi possível carregar o nome salvo"));
    });

    return unsubscribe;
  }, [showFeedback]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
    }, () => showFeedback("Não foi possível carregar os links"));

    return () => {
      unsub();
    }

  }, [showFeedback])

  async function handleProfileSave(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = auth.currentUser;
    const name = profileName.trim();
    if (!user) {
      showFeedback("Não foi possível identificar sua conta");
      return;
    }
    if (!name) {
      showFeedback("Digite um nome para o perfil");
      return;
    }

    try {
      await setDoc(doc(db, "profiles", user.uid), { name }, { merge: true });
      setProfileName(name);
      showFeedback("Nome atualizado");
    } catch {
      showFeedback("Não foi possível salvar o nome");
    }
  }

  function handleRegister(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nameInput === '' || urlInput === ''){
      showFeedback("Preencha o nome e o endereço do link");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("")
      setUrlInput("")
      showFeedback("Link salvo");
    })
    .catch(() => {
      showFeedback("Não foi possível salvar o link");
    })
  }

  async function handleDeleteLink(id: string){
    try {
      await deleteDoc(doc(db, "links", id));
      showFeedback("Link excluído");
    } catch {
      showFeedback("Não foi possível excluir o link");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pb-12">
      <Header />

      <form className="mt-8 mb-2 flex w-full max-w-xl flex-col" onSubmit={handleProfileSave}>
        <label className="mt-2 mb-2 font-medium text-white" htmlFor="profile-name">Nome do perfil</label>
        <Input
          id="profile-name"
          placeholder="Como deseja aparecer no perfil?"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <button type="submit" className="mb-3 flex h-10 items-center justify-center rounded-md bg-orange-600 font-medium text-white transition-colors hover:bg-orange-500">
          Salvar nome
        </button>
      </form>

      <form className="mt-8 mb-3 flex w-full max-w-xl flex-col" onSubmit={handleRegister}>
        <label className="mt-2 mb-2 font-medium text-white">Nome do Link</label>
        <Input
          placeholder="Nome do Link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="mt-2 mb-2 font-medium text-white">URL</label>
        <Input
          type="url"
          placeholder="URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        
        <section className="my-4 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <label className="my-2 font-medium text-white">Cor do Texto</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="my-2 font-medium text-white">Cor de Fundo</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="mb-7 flex flex-col items-center justify-start rounded-md border border-white/20 p-2">
          <label className="mt-2 mb-3 font-medium text-white">Preview</label>
          <article
            className="flex w-11/12 max-w-lg flex-col items-center justify-between rounded px-1 py-3"
            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
          >
            <p className="font-medium" style={{ color: textColorInput }}> {nameInput} </p>
           
          </article>
        </div>
        )}

        <button type="submit" className="mb-7 flex h-10 items-center justify-center rounded-md bg-orange-600 font-medium text-white transition-colors hover:bg-orange-500">
          Salvar Link
        </button>

      </form>

      <section className="w-full max-w-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">Meus Links</h2>

      {links.map((Link) => (
        <article
        key={Link.id}
        className="mb-2 flex w-11/12 min-w-0 items-center justify-between gap-4 rounded px-3 py-3"
        style={{ backgroundColor: Link.bg, color: Link.color }}
      >

        <p className="min-w-0 break-words font-medium">{Link.name}</p>
        <div>
          <button
          aria-label={`Excluir ${Link.name}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 transition hover:border-red-400/50 hover:bg-red-500/15"
          onClick={ () => handleDeleteLink(Link.id) }>
            <FiTrash size={18} color="#fff" />
          </button>
        </div>
      </article>
      ))}
      </section>
      <FeedbackToast message={message} />

    </div>
  );
}
