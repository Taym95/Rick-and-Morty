import { myAxios } from "./api";

const { CancelToken } = myAxios;

let cancel;

const cancellation = () => ({
  cancelToken: new CancelToken(function executor(canceller) {
    cancel = canceller;
  })
});

export const getCharacter = async () => {
  const response = await myAxios.get(`character/?page=1`, cancellation);
  return response.data;
};

export const searchByPage = async url => {
  const response = await myAxios.get(url, cancellation);
  return response.data;
};

export const getCharacterLocation = async url => {
  const response = await myAxios.get(url);
  return response.data;
};

export const getCharacterEpisodes = async urls => {
  const response = await Promise.all(
    urls.map(url => myAxios.get(url, cancellation))
  );
  return response.map(episode => episode.data.name);
};
