import owid from '../../data/owid/owid-covid-data.json';

let data = new Map();

for (const country in owid) {
    const details = owid[country];
    for (const dailyData of details.data) {
        const date = dailyData.date;
        let map = data.get(date);
        if (map === undefined) map = new Map();
        map.set(country, dailyData);
        data.set(date, map);
    }
}

export default data;
