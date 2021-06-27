import owidData from '../../data/owid/owid-covid-data-lut.json';
import owidDataProperties from '../../data/owid/owid-covid-data-properties.json';
import geo from '../../data/world.geo.json/countries.geo.json';
import { interpolateOrRd, interpolateYlOrRd, interpolateInferno, interpolateYlGn, interpolateGnBu } from 'd3-scale-chromatic';
import { Tooltip } from 'react-leaflet';


export function owidLayers(date) {
    const owidDaily = owidData[date.toISOString().split('T')[0]];
    const defaultStyle = { stroke: false, fill: false };
    const getData = (id, name) => {
        if (owidDaily === undefined) return undefined;
        const data = owidDaily[id];
        if (data !== undefined) return data[name];
        return undefined;
    };
    const layerDefs = [
        ['total_cases', f => interpolateOrRd(f)],
        ['total_cases_per_million', f => interpolateOrRd(f)],
        ['total_deaths', f => interpolateOrRd(f)],
        ['total_deaths_per_million', f => interpolateOrRd(f)],
        ['reproduction_rate', f => interpolateOrRd(f)],
        ['total_tests', f => interpolateOrRd(f)],
        ['total_tests_per_thousand', f => interpolateOrRd(f)],
        ['positive_rate', f => interpolateOrRd(f)],
        ['tests_per_case', f => interpolateOrRd(f)],
        ['total_vaccinations', f => interpolateGnBu(f)],
        ['total_vaccinations_per_hundred', f => interpolateGnBu(f)],
        ['icu_patients', f => interpolateOrRd(f)],
        ['icu_patients_per_million', f => interpolateOrRd(f)],
        ['hosp_patients', f => interpolateOrRd(f)],
        ['hosp_patients_per_million', f => interpolateOrRd(f)],
        ['new_vaccinations', f => interpolateGnBu(f)],
        ['weekly_hosp_admissions', f => interpolateOrRd(f)],
        ['weekly_hosp_admissions_per_million', f => interpolateOrRd(f)],
        ['weekly_icu_admissions', f => interpolateOrRd(f)],
        ['weekly_icu_admissions_per_million', f => interpolateOrRd(f)],
        ['stringency_index', f => interpolateOrRd(f)],
        ['recovery', f => interpolateYlGn(f)]
    ];

    return layerDefs.map(
        (def) => {
            const [name, genColor] = def;
            return {
                name: name.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                checked: false,
                geoJson: geo,
                polygonStyle: (feature) => {
                    const data = getData(feature.id, name);
                    return (data === undefined) ? defaultStyle : {
                        stroke: false,
                        fill: true,
                        fillOpacity: 0.8,
                        color: genColor(data / owidDataProperties[name].max),
                    };
                },
                polygonChild: (feature) => {
                    const data = getData(feature.id, name);
                    return (
                        <Tooltip key={feature.properties.name}>{`${feature.properties.name} | ${data}`}</Tooltip>
                    )
                }
            }
        }
    )
}
