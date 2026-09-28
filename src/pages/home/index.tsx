import { Social } from "../../components/social";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPinterest, FaTiktok, FaTwitch, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { auth, db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from "firebase/firestore"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

interface LinkProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps{
  facebook?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  twitch?: string;
  pinterest?: string;
  whatsapp?: string;
}

const socialOptions = [
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "twitter", label: "X", Icon: FaXTwitter },
  { key: "twitch", label: "Twitch", Icon: FaTwitch },
  { key: "pinterest", label: "Pinterest", Icon: FaPinterest },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
] as const;

export function Home() {
  const { profileId } = useParams();
  const profileKey = profileId ?? "root";
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()
  const [resolvedProfile, setResolvedProfile] = useState({ key: "", name: "" });
  const profileName = resolvedProfile.key === profileKey ? resolvedProfile.name : "";

  useEffect(() => {
    let active = true;
    const saveName = (name: string) => setResolvedProfile({ key: profileKey, name });

    if (!profileId) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          saveName("Meus links");
          return;
        }

        getDoc(doc(db, "profiles", user.uid))
          .then((snapshot) => {
            if (active) saveName(snapshot.data()?.name ?? user.displayName ?? "Meu Perfil");
          })
          .catch(() => {
            if (active) saveName(user.displayName ?? "Meu Perfil");
          });
      });

      return () => {
        active = false;
        unsubscribe();
      };
    }

    getDoc(doc(db, "profiles", profileId))
      .then((snapshot) => {
        if (active) saveName(snapshot.data()?.name ?? "Meu Perfil");
      })
      .catch(() => {
        if (active) saveName("Meu Perfil");
      });

    return () => {
      active = false;
    };
  }, [profileId, profileKey]);

  useEffect(()=> {
    function loadLinks(){
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          })
        })

        setLinks(lista);
      })
      .catch(() => setLinks([]));
    }

    loadLinks();
  }, [])

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setSocialLinks({
              facebook: snapshot.data()?.facebook,
              instagram: snapshot.data()?.instagram,
              youtube: snapshot.data()?.youtube,
              tiktok: snapshot.data()?.tiktok,
              linkedin: snapshot.data()?.linkedin,
              github: snapshot.data()?.github,
              twitter: snapshot.data()?.twitter,
              twitch: snapshot.data()?.twitch,
              pinterest: snapshot.data()?.pinterest,
              whatsapp: snapshot.data()?.whatsapp,
            });
          }
        });
    }

    loadSocialLinks();
  }, []);


  return (
    <div className="flex min-h-screen w-full flex-col items-center px-5 py-12 sm:py-16">
      <header className="mb-7 flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="min-h-[2.25rem] break-words text-3xl font-bold text-white sm:min-h-[2.5rem] sm:text-4xl">{profileName || "\u00a0"}</h1>
        <span className="mt-2 text-zinc-300">Meus Links</span>
      </header>

      <main className="flex w-full max-w-xl flex-col gap-3 text-center">
      {links.map((link) => (
        <section
          style={{ backgroundColor: link.bg }}
          key={link.id}
          className="w-full rounded-lg border border-white/10 px-5 py-3 transition-colors hover:border-white/30 hover:brightness-110"
        >
          <a className="block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70" href={link.url} target="_blank" rel="noreferrer">
            <p className="text-base md:text-lg" style={{ color: link.color }}>
              {link.name}
            </p>
          </a>
        </section>
      ))}

       { socialLinks && Object.values(socialLinks).some((url) => url?.trim()) && (
         <footer className="my-8 flex flex-wrap justify-center gap-3" aria-label="Redes sociais">
          {socialOptions.map(({ key, label, Icon }) => {
            const url = socialLinks[key];
            return url?.trim() ? <Social key={key} label={label} url={url}><Icon size={25} /></Social> : null;
          })}
        </footer>
       )}

      </main>
    </div>
  );
}
