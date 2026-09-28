import { Link } from 'react-router-dom'

export function ErrorPage(){
  return(
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">Página não encontrada</h2>
      <p className="mb-4 text-center italic">Você caiu em uma página que não existe!</p>

      <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/">
        Voltar para Início
      </Link>
    </div>
  )
}
