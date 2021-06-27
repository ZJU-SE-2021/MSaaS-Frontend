import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { LinearGradient } from '@vx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import owidDataProvider from './providers/owid';

import { Box, Container } from '@material-ui/core';
import { ParentSize, withParentSize } from '@vx/responsive';

//console.log(dailyData);
export const background = '#a3d2ca';
export const background2 = '#5eaaa8';
export const casesAccentColor = '#af2d2d';
export const recsAccentColor = '#61b15a';
export const deathsAccentColor = '#111111';
export const accentColorDark = '#f8f1f1';
const tooltip1Styles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: '#af2d2d',
};
const tooltip2Styles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: '#61b15a',
};
const tooltip3Styles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: '#111111',
};
//const startDate=Date();
//const owidDaily = owidDataProvider.get(new Date(2020,1,20).toISOString().split('T')[0]);
// util
const formatDate = timeFormat("%Y-%b-%d");

export default withParentSize(function LineChart({ parentWidth, parentHeight, width, height, data, enableTooltip = false }) {
    // const width = parentWidth;
    // const height = parentHeight;
    width = width || parentWidth;
    height = height || parentHeight;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    //data_related
    //const owidDaily = owidDataProvider.get(date.toISOString().split('T')[0]);
    //const stock = owidDaily.get(0);
    //
    const [country, setCountry] = React.useState("OWID_WRL");
    // const stock = dailyData[country].data;
    //console.log(stock);
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        updateTooltip,
        showTooltip,
        hideTooltip,
    } = useTooltip();
    const Tooltip2 = useTooltip();
    const Tooltip3 = useTooltip();
    if (width < 10) return null;
    // accessors
    const getDate = (d) => new Date(d.date);
    const getCases = (d) => d.total_cases || 0;
    const getDeaths = (d) => d.total_deaths || 0;
    const getRec = (d) => d.recovery || 0;
    const bisectDate = bisector(d => new Date(d.date)).left;
    //stockValueScale
    const stockValueScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                domain: [0, (max(data, getCases) || 0) + yMax / 3],
                nice: true,
            }),
        [yMax, data],
    );
    //dateScale
    const dateScale = useMemo(
        () =>
            scaleTime({
                range: [0, xMax],
                domain: extent(data, getDate),
            }),
        [xMax, data],
    );
    // tooltip handler
    const handleTooltip = useCallback(
        (event) => {
            if(!enableTooltip) return;
            let { x } = localPoint(event) || { x: 0 };
            let x0 = dateScale.invert(x);
            let index = bisectDate(data, x0, 1);
            let d0 = data[index - 1];
            let d1 = data[index];
            let d = d0;
            if (d1 && getDate(d1)) {
                d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
            }
            showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: stockValueScale(getCases(d)),
            });
            Tooltip2.showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: stockValueScale(getDeaths(d)),
            });
            Tooltip3.showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: stockValueScale(getRec(d)),
            });
        },
        [showTooltip, Tooltip2, Tooltip3, stockValueScale, dateScale, data],
    );
    // bounds
    //debugger;
    return (
        <div>

            <svg width={width} height={height} left={1000}>
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="url(#area-background-gradient)"
                    rx={14}
                />
                <LinearGradient id="area-background-gradient" from={background} to={background2} />
                <LinearGradient id="area-cases-gradient" from={casesAccentColor} to={casesAccentColor} toOpacity={0.1} />
                <LinearGradient id="area-recs-gradient" from={recsAccentColor} to={recsAccentColor} toOpacity={0.1} />
                <LinearGradient id="area-deaths-gradient" from={deathsAccentColor} to={deathsAccentColor} toOpacity={0.1} />
                <GridRows
                    scale={stockValueScale}
                    width={xMax}
                    strokeDasharray="3,3"
                    stroke={casesAccentColor}
                    strokeOpacity={0.3}
                    pointerEvents="none"
                />
                <GridColumns
                    scale={dateScale}
                    height={yMax}
                    strokeDasharray="3,3"
                    stroke={casesAccentColor}
                    strokeOpacity={0.3}
                    pointerEvents="none"
                />
                <AreaClosed id='cases-area'
                    data={data}
                    x={d => dateScale(getDate(d))}
                    y={d => stockValueScale(getCases(d))}
                    yScale={stockValueScale}
                    strokeWidth={1}
                    stroke="url(#area-cases-gradient)"
                    fill="url(#area-cases-gradient)"
                    curve={curveMonotoneX}
                />
                <AreaClosed id='rec-area'
                    data={data}
                    x={d => dateScale(getDate(d))}
                    y={d => stockValueScale(getRec(d))}
                    yScale={stockValueScale}
                    strokeWidth={1}
                    stroke="url(#area-recs-gradient)"
                    fill="url(#area-recs-gradient)"
                    curve={curveMonotoneX}
                />
                <AreaClosed id='deaths-area'
                    data={data}
                    x={d => dateScale(getDate(d))}
                    y={d => stockValueScale(getDeaths(d))}
                    yScale={stockValueScale}
                    strokeWidth={1}
                    stroke="url(#area-deaths-gradient)"
                    fill="url(#area-deaths-gradient)"
                    curve={curveMonotoneX}
                />
                <Bar
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="transparent"
                    rx={14}
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={() => hideTooltip()}
                />
                {tooltipData && Tooltip3.tooltipData && (
                    <g>
                        <Line
                            from={{ x: tooltipLeft, y: 0 }}
                            to={{ x: tooltipLeft, y: yMax }}
                            stroke={accentColorDark}
                            strokeWidth={2}
                            pointerEvents="none"
                            strokeDasharray="5,2"
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={Tooltip2.tooltipTop}
                            r={4}
                            fill={accentColorDark}
                            stroke="white"
                            strokeWidth={2}
                            pointerEvents="none"
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={Tooltip3.tooltipTop}
                            r={4}
                            fill={accentColorDark}
                            stroke="white"
                            strokeWidth={2}
                            pointerEvents="none"
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={tooltipTop}
                            r={4}
                            fill={accentColorDark}
                            stroke="white"
                            strokeWidth={2}
                            pointerEvents="none"
                        />
                    </g>
                )}
            </svg>
            {tooltipData && Tooltip3.tooltipData && (
                <div>
                    <Tooltip top={tooltipTop + 90} left={tooltipLeft + 210} style={tooltip1Styles}>
                        {`${getCases(tooltipData)}`}
                    </Tooltip>
                    <Tooltip top={Tooltip3.tooltipTop + 90} left={tooltipLeft + 140} style={tooltip2Styles}>
                        {`${getRec(Tooltip3.tooltipData)}`}
                    </Tooltip>
                    <Tooltip top={Tooltip2.tooltipTop + 90} left={tooltipLeft + 70} style={tooltip3Styles}>
                        {`${getDeaths(tooltipData)}`}
                    </Tooltip>
                    <Tooltip
                        top={yMax - 14}
                        left={tooltipLeft + 350}
                        style={{
                            ...defaultStyles,
                            minWidth: 72,
                            textAlign: 'center',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {formatDate(getDate(tooltipData))}
                    </Tooltip>
                </div>
            )}
        </div>
    );
}
)