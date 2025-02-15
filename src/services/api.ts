import axios from 'axios';

const API_URL = 'https://picsum.photos/v2/list';

type PaginationParams = {
  page: number;
  limit: number;
}

export const fetchImages = async ({page, limit}:PaginationParams ) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        page,
        limit
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};