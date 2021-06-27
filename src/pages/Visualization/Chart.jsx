import React from 'react';
import ChartView from './components/ChartView';
import { Grid } from '@material-ui/core';

export default function Chart() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ChartView country="OWID_WRL" height={400} editable enableTooltip />
      </Grid>
      {['CHN', 'USA', 'RUS', 'SGP', 'JPN', 'IND'].map((c) => (
        <Grid item xs={6}>
          <ChartView country={c} height={400} />
        </Grid>
      ))}
    </Grid>
  );
}
