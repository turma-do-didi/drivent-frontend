import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useGithubLogin(setUserData, toastMessage) {
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get('code');

      if (codeParam) {
        const response = await axios.post(`http://localhost:4000/auth/sign-in/github?code=${codeParam}`);

        const userData = response.data;

        setUserData(userData);

        toast(toastMessage);
        navigate('/dashboard');
      }
    }

    getUserData();
  }, [setUserData, toast, navigate]); // dependencies for the useEffect
}

export default useGithubLogin;
