import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <header className="mt-4 w-full max-w-2xl px-1">
            <nav className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-zinc-950/70 px-3">
                <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-200">
                    <Link className="hover:text-white" to="/">
                        Início
                    </Link>
                    <Link className="hover:text-white" to="/admin">
                        Admin
                    </Link>
                    <Link className="hover:text-white" to="/admin/social">
                        Redes Sociais
                    </Link>
                </div>

                <button aria-label="Sair" className="flex h-9 w-9 shrink-0 items-center justify-center rounded transition hover:bg-white/5" onClick={handleLogout}>
                    <BiLogOut size={28} color="#db2629" />
                </button>
            </nav>
        </header>
    );
}
