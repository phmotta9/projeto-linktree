import { Link } from 'react-router-dom';
import { Input } from "../../components/input";

export function Login() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
        <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      <form className="flex flex-col w-full max-w-md px-4">
        <Input />
      </form>
    </div>
  );
}