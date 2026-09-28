import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../../components/input";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaLink } from "react-icons/fa";
import { FeedbackToast } from "../../components/feedback";
import { useFeedback } from "../../hooks/useFeedback";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { message, showFeedback } = useFeedback();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(email === "" || password === "") {
      showFeedback("Preencha seu e-mail e sua senha");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Usuário logado com sucesso!");
        navigate("/admin", { replace: true });
      })
      .catch(() => {
        showFeedback("Não foi possível entrar. Confira seus dados.");
      });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="relative flex min-h-[32rem] w-full max-w-sm flex-col items-center overflow-hidden rounded-[2rem] px-6 pb-8 pt-16">
        <div className="mb-5 text-orange-400"><FaLink size={54} /></div>
        <Link to="/" className="mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">Link<span className="text-orange-500">Hub</span></h1>
        </Link>
        <p className="mb-10 text-sm text-orange-100/80">Seus links, do seu jeito.</p>

      <form onSubmit={handleSubmit} className="mt-3 flex w-full flex-col">
        <Input 
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        type="submit"
        className="mt-2 h-11 rounded-lg bg-orange-600 text-base font-medium text-white transition-colors hover:bg-orange-500">
          Entrar
        </button>
      </form>
      </div>
      <FeedbackToast message={message} />
    </div>
  );
}
