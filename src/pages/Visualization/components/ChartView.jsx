import React, { useEffect } from 'react';
import LineChart from './LineChart';
import { Card, CardMedia, CardContent, CardHeader, IconButton, Box, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import dailyData from '../data/owid/owid-covid-data-processed';

export default function ChartView({ country, height, editable = false, enableTooltip }) {
    const [countryCode, setCountryCode] = React.useState(country);
    const countryInfo = dailyData[countryCode];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const countryList = [
        'AFG', 'AGO', 'ALB', 'ARE', 'ARG', 'AUS', 'AUT', 'AZE', 'BGD', 'BGR', 'BHS',
        'BLR', 'BOL', 'BRA', 'CAN', 'CHE', 'CHL', 'CHN', 'CMR', 'COD', 'COG', 'COL', 'CRI', 'CUB',
        'CZE', 'DEU', 'DNK', 'DZA', 'ECU', 'EGY', 'ESP', 'ETH', 'FIN', 'FRA', 'GBR', 'GHA', 'GTM',
        'IDN', 'IND', 'IRN', 'IRQ', 'ISL', 'ISR', 'ITA', 'JPN', 'KAZ', 'KEN', 'KOR', 'LKA', 'MDG',
        'MEX', 'MMR', 'MOZ', 'MYS', 'NGA', 'NLD', 'NPL', 'OWID_WRL', 'PAK', 'PHL', 'POL', 'ROU',
        'RUS', 'SAU', 'SDN', 'SGP', 'SWE', 'SYR', 'THA', 'TUR', 'UGA', 'UKR', 'USA', 'UZB', 'VNM',
        'ZAF', 'ZMB', 'ZWE'
    ];

    return (
        <Card>
            <CardHeader
                title={countryInfo.location}
                subheader={`${countryInfo.continent ? `${countryInfo.continent} | ` : ''}Population ${countryInfo.population} | Median Age ${countryInfo.median_age}${countryInfo.human_development_index ? ` | Human Development Index ${countryInfo.human_development_index}` : ''}`}
                action={
                    editable &&
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVert />
                    </IconButton>
                }
            />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {
                    countryList.map(
                        c => (
                            <MenuItem key={c} onClick={() => { setCountryCode(c); setAnchorEl(null); }}>
                                {dailyData[c].location}
                            </MenuItem>
                        )
                    )
                }
            </Menu>
            <CardContent>
                <LineChart height={height} data={countryInfo.data} enableTooltip={enableTooltip} />
            </CardContent>
        </Card>
    )
}
