module.exports = {
  byCity: (searchResult) => {
    let cityArr = searchResult.map((item) => {
      item = item.address;
      return item;
    });
    cityArr = [...new Set(cityArr)];

    searchResult = [...new Set(searchResult)];

    cityArr = cityArr.filter((item) => item);
    cityArr = cityArr.sort();
    cityArr.push(null);
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

    console.log(searchResult);

    fieldArr = fieldArr.filter((item) => item);
    fieldArr = fieldArr.sort();
    fieldArr.push(null);
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

    console.log(searchResult);

    skillArr = skillArr.filter((item) => item);
    skillArr = skillArr.sort();
    skillArr.push(null);
    const resultSearch = [];

    for (const skill of skillArr) {
      const item = {title: skill ? skill : 'Skilless'};
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
};
