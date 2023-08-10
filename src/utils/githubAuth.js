const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function loginWithGithub() {
  window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
}
