import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './TrybeRecipes.jpeg';
import './Login.css';

function Login() {
  const [button, setButton] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // usa isso para mudar de pagina , veja linha 42.
  const history = useHistory();

  // A funcao que verifica é utilizada toda vez que email ou  password sao alterados
  useEffect(() => {
    // Funcao que faz a verificacao do email: requisito 5
    const verifyEmailAndPassword = () => {
      const checkEmail = /.+@.+\.[A-Za-z]+$/;
      const minimumCarac = 6;
      if (password.length > minimumCarac && checkEmail.test(email)) {
        setButton(false);
      } else { setButton(true); }
    };
    verifyEmailAndPassword();
  }, [email, password]);

  // setam o email e a password
  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClick = () => {
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    const personalEmail = {
      email,
    };
    localStorage.user = JSON.stringify(personalEmail);
    history.push('/comidas');
  };

  return (
    <>
      <img className="logo" alt="logo" src={ logo } />
      <div>
        <form className="telaDeLogin">
          <div className="inputsLogin">
            <input
              data-testid="email-input"
              className="email-input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={ handleChange }
            />
            <input
              data-testid="password-input"
              className="password-input"
              type="password"
              placeholder="Senha"
              name="password"
              onChange={ handleChange }
            />
          </div>
          <div className="loginButton">
            <button
              disabled={ button }
              className="login-button"
              data-testid="login-submit-btn"
              type="submit"
              id="button"
              onClick={ handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
