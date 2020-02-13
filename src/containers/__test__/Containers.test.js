import * as React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CharactersList } from "../CharactersList";
import { Pagination } from "../../components";

const mockData = {
  info: {
    count: 493,
    pages: 25,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: ""
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1"
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3",
        "https://rickandmortyapi.com/api/episode/4",
        "https://rickandmortyapi.com/api/episode/5",
        "https://rickandmortyapi.com/api/episode/6",
        "https://rickandmortyapi.com/api/episode/7",
        "https://rickandmortyapi.com/api/episode/8",
        "https://rickandmortyapi.com/api/episode/9",
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/11",
        "https://rickandmortyapi.com/api/episode/12",
        "https://rickandmortyapi.com/api/episode/13",
        "https://rickandmortyapi.com/api/episode/14",
        "https://rickandmortyapi.com/api/episode/15",
        "https://rickandmortyapi.com/api/episode/16",
        "https://rickandmortyapi.com/api/episode/17",
        "https://rickandmortyapi.com/api/episode/18",
        "https://rickandmortyapi.com/api/episode/19",
        "https://rickandmortyapi.com/api/episode/20",
        "https://rickandmortyapi.com/api/episode/21",
        "https://rickandmortyapi.com/api/episode/22",
        "https://rickandmortyapi.com/api/episode/23",
        "https://rickandmortyapi.com/api/episode/24",
        "https://rickandmortyapi.com/api/episode/25",
        "https://rickandmortyapi.com/api/episode/26",
        "https://rickandmortyapi.com/api/episode/27",
        "https://rickandmortyapi.com/api/episode/28",
        "https://rickandmortyapi.com/api/episode/29",
        "https://rickandmortyapi.com/api/episode/30",
        "https://rickandmortyapi.com/api/episode/31"
      ],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z"
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1"
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3",
        "https://rickandmortyapi.com/api/episode/4",
        "https://rickandmortyapi.com/api/episode/5",
        "https://rickandmortyapi.com/api/episode/6",
        "https://rickandmortyapi.com/api/episode/7",
        "https://rickandmortyapi.com/api/episode/8",
        "https://rickandmortyapi.com/api/episode/9",
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/11",
        "https://rickandmortyapi.com/api/episode/12",
        "https://rickandmortyapi.com/api/episode/13",
        "https://rickandmortyapi.com/api/episode/14",
        "https://rickandmortyapi.com/api/episode/15",
        "https://rickandmortyapi.com/api/episode/16",
        "https://rickandmortyapi.com/api/episode/17",
        "https://rickandmortyapi.com/api/episode/18",
        "https://rickandmortyapi.com/api/episode/19",
        "https://rickandmortyapi.com/api/episode/20",
        "https://rickandmortyapi.com/api/episode/21",
        "https://rickandmortyapi.com/api/episode/22",
        "https://rickandmortyapi.com/api/episode/23",
        "https://rickandmortyapi.com/api/episode/24",
        "https://rickandmortyapi.com/api/episode/25",
        "https://rickandmortyapi.com/api/episode/26",
        "https://rickandmortyapi.com/api/episode/27",
        "https://rickandmortyapi.com/api/episode/28",
        "https://rickandmortyapi.com/api/episode/29",
        "https://rickandmortyapi.com/api/episode/30",
        "https://rickandmortyapi.com/api/episode/31"
      ],
      url: "https://rickandmortyapi.com/api/character/2",
      created: "2017-11-04T18:50:21.651Z"
    }
  ]
};

describe("Containers tests", () => {
  afterEach(cleanup);

  test("should display Loader if characters list is empty ", async () => {
    const { getByTestId } = render(<CharactersList characters={[]} />);
    const Loader = await getByTestId("loading");
    expect(Loader).toBeInTheDocument();
  });

  test("should display characters card list if characters list is provided", async () => {
    const { getByTestId, getAllByTestId } = render(
      <CharactersList characters={mockData.results} />
    );
    const charactersList = await getByTestId("characters-list");
    const characterCards = await getAllByTestId("character-card");

    expect(charactersList).toBeInTheDocument();

    expect(characterCards).toHaveLength(2);
  });

  test("NextPage button should be enabled if nextPage URL is not an empty string", async () => {
    const { getByTestId } = render(
      <Pagination
        onNextPress={() => {}}
        onPrevPress={() => {}}
        prevPage={mockData.info.prev}
        nextPage={mockData.info.next}
      />
    );
    const paginationNextPage = await getByTestId("pagination-nextPage");

    expect(paginationNextPage).toBeInTheDocument();
    expect(paginationNextPage).toBeEnabled();
  });

  test("onNextPress should be fired after clicking enabled NextPage button ", async () => {
    const logSpy = jest.spyOn(console, "log");

    const { getByTestId } = render(
      <Pagination
        onNextPress={() => {}}
        onPrevPress={() => {}}
        prevPage={mockData.info.prev}
        nextPage={mockData.info.next}
      />
    );
    const paginationNextPage = await getByTestId("pagination-nextPage");

    act(() => {
      fireEvent.click(paginationNextPage);
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("onNextPress");
  });

  test("prevPage button to be disabled if prevPage URL is an empty string", async () => {
    const { getByTestId } = render(
      <Pagination
        onNextPress={() => {}}
        onPrevPress={() => {}}
        prevPage={mockData.info.prev}
        nextPage={mockData.info.next}
      />
    );
    const paginationPrevPage = await getByTestId("pagination-prevPage");

    expect(paginationPrevPage).toBeInTheDocument();
    expect(paginationPrevPage).toBeDisabled();
  });

  test("onPrevPress should not be fired after clicking on disabled PrevPage button ", async () => {
    const logSpy = jest.spyOn(console, "log");

    const { getByTestId } = render(
      <Pagination
        onNextPress={() => {}}
        onPrevPress={() => {}}
        prevPage={mockData.info.prev}
        nextPage={mockData.info.next}
      />
    );
    const paginationPrevPage = await getByTestId("pagination-prevPage");
    act(() => {
      fireEvent.click(paginationPrevPage);
    });

    expect(logSpy).not.toHaveBeenCalledWith("onPrevPress");
  });
});
