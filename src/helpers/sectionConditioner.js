const dataCompany = [
  {
    id: 3,
    name: 'PT. eSea Indonesia',
    field: null,
    city: null,
    photo: null,
    authorId: 2,
    createdAt: '2020-12-02T09:34:30.000Z',
    updatedAt: '2020-12-02T09:34:30.000Z',
  },
  {
    id: 1,
    name: 'Tuku Bae',
    field: 'Ecommerce',
    city: 'Jakarta',
    photo: null,
    authorId: 1,
    createdAt: '2020-12-02T06:20:34.000Z',
    updatedAt: '2020-12-02T06:20:34.000Z',
  },
  {
    id: 2,
    name: 'Send Bae',
    field: 'Comunication',
    city: 'Jakarta',
    photo: null,
    authorId: 1,
    createdAt: '2020-12-02T06:20:34.000Z',
    updatedAt: '2020-12-02T06:20:34.000Z',
  },
];

module.exports = {
  byCity: (searchResult) => {
    let cityArr = searchResult.map((item) => {
      item = item.city;
      return item;
    });
    cityArr = [...new Set(cityArr)];

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const city of cityArr) {
      const item = {title: city};
      const data = [];
      for (const result of searchResult) {
        if (city === result.city) {
          data.push(result);
        }
      }
      Object.assign(item, {data});
      resultSearch.push(item);
    }

    return resultSearch;
  },
};
