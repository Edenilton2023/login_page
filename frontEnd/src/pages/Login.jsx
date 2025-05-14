import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert('Login OK!');
        navigate('/home'); // redireciona se der certooo
      } else {
        alert(dados.mensagem);
      }

    } catch (erro) {
      alert('Erro ao fazer  login');
      console.error(erro);
    }
  };

  return (

    <div className=" flex items-center p-4 justify-center h-screen bg-gray-600  flex-col" >
      <div className=' bg-gray-500 flex items-center justify-center h-10 w-50 rounded-lg flex-col mb-4 text-white'>
        <p>  teste@email.com
          <br />
           <br />
        </p>
        <p>123456</p>
        </div>
      <h1 className="text-xl  w-50 h-12 p-3 text-center font-bold bg-gray-500 rounded-lg text-white">Login</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 my-2 bg-gray-100"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="block border p-2 my-2 bg-gray-100"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2  w-50 h-12 p-3 rounded-lg">
        Entrar
      </button>
    </div>
  );
}
export default Login;