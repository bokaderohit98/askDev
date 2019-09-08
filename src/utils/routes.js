export default {
    register: '/users/register',
    login: '/users/login',
    profile: '/profile',
    fetchDevelopers: '/profile/all',
    fetchGithubRepos: username => `https://api.github.com/users/${username}/repos`,
    saveExperience: '/profile/experience',
    saveEducation: '/profile/education',
    deleteExperience: _id => `/profile/experience/${_id}`,
    deleteEducation: _id => `/profile/education/${_id}`,
    fetchPosts: '/posts',
    savePost: '/posts'
};
