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
  byJobTitle: (searchResult) => {
    let jobTitleArr = searchResult.map((item) => {
      item = item.jobTitle;
      return item;
    });
    jobTitleArr = [...new Set(jobTitleArr)];

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const jobTitle of jobTitleArr) {
      const item = {title: jobTitle};
      const data = [];
      for (const result of searchResult) {
        if (jobTitle === result.jobTitle) {
          data.push(result);
        }
      }
      Object.assign(item, {data});
      resultSearch.push(item);
    }

    return resultSearch;
  },
  byCompanyField: (searchResult) => {
    let CompanyArr = searchResult.map((item) => {
      item = item.Company.field;
      return item;
    });
    CompanyArr = [...new Set(CompanyArr)];

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const Company of CompanyArr) {
      const item = {title: Company};
      const data = [];
      for (const result of searchResult) {
        if (Company === result.Company.field) {
          data.push(result);
        }
      }
      Object.assign(item, {data});
      resultSearch.push(item);
    }

    return resultSearch;
  },
};
