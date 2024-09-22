import React, { useState } from 'react';
import Singup from '../components/Singup';
import Signin from '../components/Signin';

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <div>
      {' '}
      {signUp ? (
        <Singup setSignUp={setSignUp} />
      ) : (
        <Signin setSignUp={setSignUp} />
      )}
    </div>
  );
};

export default Login;
