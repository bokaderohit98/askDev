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
    savePost: '/posts',
    likePost: _id => `/posts/like/${_id}`,
    unlikePost: _id => `/posts/unlike/${_id}`,
    deletePost: _id => `/posts/${_id}`,
    postComment: _id => `/posts/comment/${_id}`
};
