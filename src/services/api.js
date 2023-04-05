import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '33675903-bd7d9339dc8df298be2da6cbf',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchApiImg = async (search, page) => {
  const { data } = await instance.get('/', {
    params: {
      q: search,
      page,
    },
  });
  return data;
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
