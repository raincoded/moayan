import apiMovie from './api/movie'
import addminMovie from './admin/movie'
const api = [
    apiMovie
];
const admin = [
    addminMovie
];
module.exports = [...api, ...admin]