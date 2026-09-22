import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
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

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

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

    })

    return () => {
      unsub();
    }

  }, [])

  function handleRegister(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nameInput === '' || urlInput === ''){
      alert("Preencha todos os campos")
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
      console.log("Cadastrado com sucesso")
    })
    .catch((error) => {
      console.log("Erro ao cadastrar" + error)
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Nome do Link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">URL</label>
        <Input
          type="url"
          placeholder="URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Cor do Texto</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Cor de Fundo</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-3">Preview</label>
          <article
            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
          >
            <p className="font-medium" style={{ color: textColorInput }}> {nameInput} </p>
           
          </article>
        </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Salvar Link
        </button>

      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      <article className="flex items-center justify-between w-11/12 rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: "#2563EB", color: "#fff" }} 
      >

        <p className="font-medium">Meu Link</p>
        <div>
          <button className="border border-dashed rounded bg-neutral-900">
            <FiTrash size={18} color="#fff" />
          </button>
        </div>
      </article>

    </div>
  );
}