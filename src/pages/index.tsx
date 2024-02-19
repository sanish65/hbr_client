import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Login, Signup } from '../utils/api';

export default function Home() {
  const router = useRouter();

  const { user , error, isLoading } = useUser();
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    handleAuthentication();
  }, [user]);
  
  const handleAuthentication = async () => {
    const sub = user?.sub;
    if(sub){
      const data = await Login({sub});
      console.log("data")
      console.log(data);

      if(data.status === 200){
        router.push('/dashboard');
      }else{
        try {
          await Signup({...user});
        } catch (error) {
          setSignupError(error.message);
        }
      }
    } 
  };

  return (
    <div className="container">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <>
          {user ? (
            <div className="dashboard">
              <h1>Welcome {user.name}!</h1>
              {signupError && <div className="error">{signupError}</div>}
              <a href="/api/auth/logout" className="logout-link">Logout</a>
            </div>
          ) : (
            <div className="login">
              <h1>Sign up now!!</h1>
              <a href="/api/auth/login" className="login-link">Signup</a>
            </div>
          )}
        </>
      )}
            <style jsx>{`
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            
            .dashboard,
            .login {
              text-align: center;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            
            .error {
              color: red;
            }
            
            .logout-link,
            .login-link {
              display: block;
              margin-top: 10px;
            }
            

`}</style>

    </div>
  );
}
