import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { Select, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { SkipPrevious, SkipNext, PlayArrow, Pause } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Box, Paper, Typography } from '@material-ui/core';
import Map from './components/Map';


import { owidLayers } from './components/layers/owid';
import { oxcgrtLayers } from './components/layers/oxcgrt';

export default function MapView() {
    const startDate = new Date(2020, 0, 22);
    const endDate = new Date(2021, 0, 14);
    const defaultDate = startDate;
    const step = 24 * 60 * 60 * 1000;
    const [date, setDate] = React.useState(defaultDate);
    const [timerEnable, setTimerEnable] = React.useState(false);
    const [interval, setInterval] = React.useState(1000);

    function valueText(value, index) {
        const date = new Date(value);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }


    React.useEffect(() => {
        const timer = timerEnable ? setTimeout(() => {
            if (date >= endDate) {
                setTimerEnable(false);
            } else {
                setDate(new Date(date.getTime() + step));
            }
        }, interval) : undefined;
        return () => timer && clearTimeout(timer);
    });


    return (
        <Paper>
            <Grid container direction="column" alignItems="stretch" alignContent="stretch">
                <Grid item >
                    <Box height="78vh">
                        <Map
                            layers={[
                                ...owidLayers(date),
                                ...oxcgrtLayers(date)
                            ]} />
                    </Box>
                </Grid>

                <Grid>
                    <Box padding={2}>
                        <Grid direction="row" spacing={3} alignItems="flex-end" container wrap='nowrap'>
                            <Grid item xs>
                                <Typography id="continuous-slider" gutterBottom>
                                    Timeline
                                </Typography>
                                <Box whiteSpace="nowrap">
                                    <IconButton aria-label="delete" onClick={() => setDate(new Date(date.getTime() - step))}>
                                        <SkipPrevious fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => setTimerEnable(!timerEnable)}>
                                        {timerEnable ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => setDate(new Date(date.getTime() + step))}>
                                        <SkipNext fontSize="small" />
                                    </IconButton>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={interval}
                                        onChange={e => setInterval(e.target.value)}
                                    >
                                        <MenuItem value={5}>5 ms</MenuItem>
                                        <MenuItem value={10}>10 ms</MenuItem>
                                        <MenuItem value={25}>25 ms</MenuItem>
                                        <MenuItem value={50}>50 ms</MenuItem>
                                        <MenuItem value={100}>100 ms</MenuItem>
                                        <MenuItem value={500}>500 ms</MenuItem>
                                        <MenuItem value={1000}>1 s</MenuItem>
                                        <MenuItem value={2000}>2 s</MenuItem>
                                        <MenuItem value={3000}>3 s</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <Slider
                                    // defaultValue={new Date().getTime()}
                                    value={date.getTime()}
                                    // getAriaValueText={valuetext}
                                    // aria-labelledby="discrete-slider-small-steps"
                                    step={step}
                                    marks
                                    valueLabelFormat={valueText}
                                    min={startDate.getTime()}
                                    max={endDate.getTime()}
                                    valueLabelDisplay="auto"
                                    onChange={(e, value) => setDate(new Date(value))}
                                />
                            </Grid>
                            <Grid item xs>
                                <Box minWidth='9rem'>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="dense"
                                            padding="dense"
                                            id="date-picker-inline"
                                            value={date}
                                            onChange={date => setDate(date)}
                                            label="Date"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
