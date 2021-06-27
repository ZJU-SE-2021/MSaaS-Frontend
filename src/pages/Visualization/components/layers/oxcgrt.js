import oxcgrtLut from '../../data/OxCGRT/lut.json';
import oxcgrtData from '../../data/OxCGRT/data.json';
import geo from '../../data/world.geo.json/countries.geo.json';
import { VpnLock, AttachMoney, LocalHospital, School, GpsFixed, WorkOff, Home, EventBusy, Euro } from '@material-ui/icons';
import { Icon } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { Tooltip } from 'react-leaflet';


const iconMap = {
    'H2: Testing policy': <LocalHospital />,
    'C1: School closing': <School />,
    'C8: International travel controls': <VpnLock />,
    'H1: Public information campaigns': <Icon>privacy_tip</Icon>,
    'H3: Contact tracing': <GpsFixed />,
    'C2: Workplace closing': <WorkOff />,
    'C6: Stay at home requirements': <Home />,
    'C3: Cancel public events': <EventBusy />,
    'C4: Restrictions on gatherings': <Icon>no_drinks</Icon>,
    'C7: Restrictions on internal movement': <Icon>no_luggage</Icon>,
    'E2: Debt/contract relief': <Euro />,
    'E1: Income support': <AttachMoney />,
    'H6: Facial Coverings': <Icon>masks</Icon>,
    'C5: Close public transport': <Icon>no_transfer</Icon>,
    'H7: Vaccination policy': <Icon>healing</Icon>,
};

const useStyles = makeStyles((theme) => ({
    newResponse: {
        color: red[900]
    },
    endedResponse: {
        color: green[900]
    }
}));

export function oxcgrtLayers(date) {
    const classes = useStyles();
    const oxcgrtDaily = oxcgrtLut[date.toISOString().split('T')[0]];

    return [
        {
            name: 'Government Response Change',
            checked: false,
            geoJson: geo,
            polygonStyle: () => {
                return {
                    stroke: false,
                    fill: false
                };
            },
            polygonChild: (feature) => {
                const responseIndices = oxcgrtDaily[feature.id];
                if (!responseIndices) return;
                const newResponses = responseIndices.new && responseIndices.new.map(idx => oxcgrtData[idx]);
                const endedResponses = responseIndices.end && responseIndices.end.map(idx => oxcgrtData[idx]);
                return (newResponses || endedResponses) && (
                    <Tooltip key={feature.properties.name} permanent>
                        {
                            newResponses && newResponses.map(
                                r => <span className={classes.newResponse}>{iconMap[r.PolicyType]}</span>
                            )
                        }
                        {
                            endedResponses && endedResponses.map(
                                r => <span className={classes.endedResponse}>{iconMap[r.PolicyType]}</span>
                            )
                        }
                    </Tooltip>
                );
            }
        },
        {
            name: 'Government Response',
            checked: false,
            geoJson: geo,
            polygonStyle: () => {
                return {
                    stroke: false,
                    fill: true,
                    fillOpacity: 0
                };
            },
            polygonChild: (feature) => {
                const responseIndices = oxcgrtDaily[feature.id];
                const responses = responseIndices && responseIndices.effective && responseIndices.effective.map(idx => oxcgrtData[idx]);
                return responses && (
                    <Tooltip key={feature.properties.name}>
                        <List component="nav" subheader={<ListSubheader>{feature.properties.name}</ListSubheader>}>
                            {
                                responses.map(r => (
                                    <ListItem button dense key={r.PolicyType}>
                                        <ListItemIcon>
                                            {iconMap[r.PolicyType]}
                                        </ListItemIcon>
                                        <ListItemText primary={r.PolicyType.split(': ')[1]} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Tooltip>
                )
            }
        }
    ]
}
