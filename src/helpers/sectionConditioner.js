module.exports = {
  byCity: (searchResult) => {
    let cityArr = searchResult.map((item) => {
      item = item.address;
      return item;
    });
    cityArr = [...new Set(cityArr)];

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const city of cityArr) {
      const item = {title: city ? city : 'All around Indonesia'};
      // const data = {list: []};
      const data = [];
      for (const result of searchResult) {
        if (city === result.address) {
          // data.list.push(result);
          data.push(result);
        }
      }
      Object.assign(item, {data});
      resultSearch.push(item);
    }
    return resultSearch;
  },
  byField: (searchResult) => {
    let fieldArr = searchResult.map((item) => {
      item = item.Company.field;
      return item;
    });
    fieldArr = [...new Set(fieldArr)];

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const field of fieldArr) {
      const item = {title: field ? field : 'All Field'};
      // const data = {list: []};
      const data = [];
      for (const result of searchResult) {
        if (field === result.Company.field) {
          // data.list.push(result);
          data.push(result);
        }
      }
      Object.assign(item, {data});
      resultSearch.push(item);
    }
    return resultSearch;
  },
  bySkill: (searchResult) => {
    let skillArr = searchResult.map((item) => {
      item = item.WorkerSkills.length ? item.WorkerSkills[0].Skill.name : null;
      console.log(item);
      return item;
    });
    skillArr = [...new Set(skillArr)];

    console.log(skillArr);

    searchResult = [...new Set(searchResult)];

    const resultSearch = [];

    for (const skill of skillArr) {
      const item = {title: skill};
      const data = [];
      for (const result of searchResult) {
        if (skill) {
          if (result.WorkerSkills.length) {
            if (skill === result.WorkerSkills[0].Skill.name) {
              data.push(result);
            }
          }
        } else {
          if (!result.WorkerSkills.length) {
            data.push(result);
          }
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
