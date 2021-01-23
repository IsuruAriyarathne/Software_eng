import { makeStyles } from "@material-ui/styles";
import SimpleTable from "../SimpleTable/SimpleTable";

const useStyles = makeStyles(theme => ({
    tableWrapper: {
        margin: '20px',
    }
}));

const simpleTableColumns = [
    {
        field: 'ammoModelID',
        name: 'Ammunition Id'
    },
    {
        field: 'description',
        name: 'Description'
    },
    {
        field: 'name',
        name: 'Name'
    }
];

const detailPanelTableHeading = "Topics"

const TopicsSimpleTable = props => {
    console.log(props.ammunitions);
    const classes = useStyles();

    return <SimpleTable
        tableWrapperClass={classes.tableWrapper}
        tableTitle={detailPanelTableHeading}
        data={props.ammunitions}
        columns={simpleTableColumns} />
}

export default TopicsSimpleTable;