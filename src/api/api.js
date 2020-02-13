import axios from "axios";

const options = {
  baseURL: "https://rickandmortyapi.com/api/"
};
const myAxios = axios.create(options);
myAxios.defaults.timeout = 2500;

export { myAxios };
