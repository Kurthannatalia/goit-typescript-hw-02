import axios from "axios";
const ACCESS_KEY = "_53SPA543-Ouwekulccwys4bavGPErzn8O6UOPMC_rc";
axios.defaults.baseURL = "https://api.unsplash.com";
// export type Search = {
//   searchQuery: string;
//   page: number;
// };
type Images = {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
  links: {
    download: string;
  };
  likes: string;
};

export type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: Images[];
};

const fetchImages = async (
  searchQuery: string,
  page: number
): Promise<UnsplashSearchResponse> => {
  const response = await axios.get<UnsplashSearchResponse>(
    `/search/photos?query=${searchQuery}`,
    {
      params: {
        query: searchQuery,
        page: page,
        per_page: 15,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  return response.data;
};
export default fetchImages;