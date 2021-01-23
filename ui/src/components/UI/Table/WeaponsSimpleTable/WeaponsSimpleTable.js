import { makeStyles } from "@material-ui/styles";
import SimpleTable from "../SimpleTable/SimpleTable";

const useStyles = makeStyles(theme => ({
    tableWrapper: {
        margin: '20px',
    }
}));

const simpleTableColumns = [
    {
        field: 'recoveryID',
        name: 'Recovery ID'
    },
    {
        field: 'ammoModelID',
        name: 'Ammunition Model ID'
    },
    {
        field: 'amount',
        name: 'Amount'
    },
    {
        field: 'name',
        name: 'Name'
    },
    {
        field: 'description',
        name: 'Description'
    }
];

const detailPanelTableHeading = "Recoveries"

const TopicsSimpleTable = props => {
    const classes = useStyles();
    console.log(props.recoveries);
    return <SimpleTable
        tableWrapperClass={classes.tableWrapper}
        tableTitle={detailPanelTableHeading}
        data={props.recoveries}
        columns={simpleTableColumns} />
}

export default TopicsSimpleTable;