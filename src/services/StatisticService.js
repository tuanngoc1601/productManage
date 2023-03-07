import { getUniqueListBy } from "../utils";

class StatisticService {
  static getChartDataNewProducts(newProducts) {
    const labels = Object.keys(newProducts);
    const dataCategoryArr = Object.values(newProducts);
    const options = {
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Quantity of products added in the last 3 months",
        },
        colors: {
          enabled: true,
          forceOverride: true,
        },
      },
    };

    const dataCategory1 = dataCategoryArr.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
    const getCount = (categoryName, list) => {
      const item = list.find((item) => item.name === categoryName);
      return item?.count;
    };

    const dataCategory = getUniqueListBy(dataCategory1, "name");
    const data = {
      labels,
      datasets: dataCategory.map((item) => {
        return {
          label: item.name,
          data: [
            getCount(item.name, dataCategoryArr[0]),
            getCount(item.name, dataCategoryArr[1]),
            getCount(item.name, dataCategoryArr[2]),
          ],
        };
      }),
    };
    return { data, options };
  }
}

export default StatisticService;
