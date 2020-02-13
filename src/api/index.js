import { myAxios } from "./api";

export const getCharacter = async () => {
  const response = await myAxios.get(`character/`);
  return response.data;
};


export const searchByPage = (url) => {
    return myAxios.get(url).then(response => response.data);
}