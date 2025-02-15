import axios from 'axios';

const API_URL = 'https://picsum.photos/v2/list';

export const fetchImages = async (page: number, limit: number = 10) => {
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