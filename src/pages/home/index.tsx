import { Social } from "../../components/social";
import { FaGithub, FaLinkedin, FaEnvelope  } from "react-icons/fa";

export function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Pedro Motta</h1>
      <span className="text-gray-50 mb-5 mt-3">Meus Links</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
          <a href="">
            <p className="text-base md:text-lg">
              Linkedin
            </p>
          </a>
        </section>

        <footer className="flex justify-center gap-3 my-10">
          <Social url="">
            <FaLinkedin size={35} color="white" />
          </Social>
          <Social url="">
            <FaGithub size={35} color="white" />
          </Social>
          <Social url="">
            <FaEnvelope size={35} color="white" />
          </Social>
        </footer>
      </main>
    </div>
  );
}