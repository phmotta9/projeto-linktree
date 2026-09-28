import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FeedbackToast } from "../../components/feedback";
import { useFeedback } from "../../hooks/useFeedback";

import { db } from "../../services/firebaseConnection";
import {
  setDoc,
  doc,
  getDoc
} from "firebase/firestore"


export function Networks() {
  const { message, showFeedback } = useFeedback();
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [twitter, setTwitter] = useState("")
  const [twitch, setTwitch] = useState("")
  const [pinterest, setPinterest] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook ?? "")
          setInstagram(snapshot.data()?.instagram ?? "")
          setYoutube(snapshot.data()?.youtube ?? "")
          setTiktok(snapshot.data()?.tiktok ?? "")
          setLinkedin(snapshot.data()?.linkedin ?? "")
          setGithub(snapshot.data()?.github ?? "")
          setTwitter(snapshot.data()?.twitter ?? "")
          setTwitch(snapshot.data()?.twitch ?? "")
          setPinterest(snapshot.data()?.pinterest ?? "")
          setWhatsapp(snapshot.data()?.whatsapp ?? "")
        }
      })
      .catch(() => showFeedback("Não foi possível carregar as redes sociais"));
    }

    loadLinks();
  }, [showFeedback])


  function handleRegister(e: SubmitEvent<HTMLFormElement>){
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
      tiktok: tiktok,
      linkedin: linkedin,
      github: github,
      twitter: twitter,
      twitch: twitch,
      pinterest: pinterest,
      whatsapp: whatsapp
    })
    .then(() => {
      showFeedback("Redes sociais salvas");
    })
    .catch(() => {
      showFeedback("Não foi possível salvar as redes sociais");
    })

  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pb-12">
      <Header/>

      <h1 className="mt-8 mb-4 text-2xl font-medium text-white">Minhas redes sociais</h1>

      <form className="flex w-full max-w-xl flex-col" onSubmit={handleRegister}>
        <label className="mt-2 mb-2 font-medium text-white">Link do Facebook</label>
        <Input type="url" placeholder="Digite a url do Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do Instagram</label>
        <Input type="url" placeholder="Digite a url do Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do YouTube</label>
        <Input type="url" placeholder="Digite a url do YouTube" value={youtube} onChange={(e) => setYoutube(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do TikTok</label>
        <Input type="url" placeholder="Digite a url do TikTok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do LinkedIn</label>
        <Input type="url" placeholder="Digite a url do LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do GitHub</label>
        <Input type="url" placeholder="Digite a url do GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do X (Twitter)</label>
        <Input type="url" placeholder="Digite a url do X (Twitter)" value={twitter} onChange={(e) => setTwitter(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do Twitch</label>
        <Input type="url" placeholder="Digite a url do Twitch" value={twitch} onChange={(e) => setTwitch(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do Pinterest</label>
        <Input type="url" placeholder="Digite a url do Pinterest" value={pinterest} onChange={(e) => setPinterest(e.target.value)} />

        <label className="mt-2 mb-2 font-medium text-white">Link do WhatsApp</label>
        <Input type="url" placeholder="Digite a url do WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

        <button
        type="submit"
        className="mb-7 flex h-10 items-center justify-center rounded-md bg-orange-600 font-medium text-white transition-colors hover:bg-orange-500"
        >
          Salvar links
        </button>
      </form>
      <FeedbackToast message={message} />
    </div>
  );
}
