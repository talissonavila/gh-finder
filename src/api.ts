const BASE_URL = "https://api.github.com";

export const fetchUser = async (userName: string) => {
  const response = await fetch(`${BASE_URL}/users/${userName}`);
  if (!response.ok) {
    return {
      status: response.status,
      message: 'User not found',
    };
  }
  return response.json();
};


export const fetchUserRepos = async (username: string) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);
  if (!response.ok) {
    return {
      status: response.status,
      message: 'Repos not founded',
    };
  }
  return response.json();
}
