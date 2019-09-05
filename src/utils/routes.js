export default {
    register: '/users/register',
    login: '/users/login',
    profile: '/profile',
    fetchDevelopers: '/profile/all',
    fetchGithubRepos: username =>
        `https://api.github.com/users/${username}/repos`
};
