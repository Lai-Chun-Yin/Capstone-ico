import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
// tslint:disable-next-line:no-var-requires
const Typography = require("@material-ui/core/Typography").default;
import * as React from "react";
import { Link } from "react-router-dom";
import { getCampaignsBySupporter } from "../../../services/campaignService";
import getDateTimeHK from "../../../services/timeService";

interface IEnhancedTableHeadProps {
  onRequestSort: (event: any, property: any) => void;
  order: string;
  orderBy: string;
  rowCount: number;
}

const columnData = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title"
  },
  { id: "start day", numeric: false, disablePadding: false, label: "Start day" },
  { id: "end day", numeric: false, disablePadding: false, label: "End day" },
  {
    id: "cap",
    numeric: false,
    disablePadding: false,
    label: "Soft / hard cap"
  },
  { id: "status", numeric: false, disablePadding: false, label: "Backers" }
];

class EnhancedTableHead extends React.Component<IEnhancedTableHeadProps> {
  public createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  };

  public render() {
    const { order, orderBy }: any = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const EnhancedTableToolbar = (props: any) => {
  return (
    <Toolbar>
      <div className="title">
        <Typography type="title">Backed Campaign</Typography>
      </div>
      <div className="spacer" />
    </Toolbar>
  );
};

interface IEnhancedTableState {
  orderBy: string;
  order: string;
  data: any;
  page: number;
  rowsPerPage: number;
}

// tslint:disable-next-line:max-classes-per-file
class BackedTable extends React.Component<any, IEnhancedTableState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "",
      data: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  public componentDidMount() {
    getCampaignsBySupporter()
      .then((result) => {
        this.setState({
          data: result.data
        });
      })
  }

  public handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort(
          (a: any, b: any) => (b[orderBy] < a[orderBy] ? -1 : 1)
        )
        : this.state.data.sort(
          (a: any, b: any) => (a[orderBy] < b[orderBy] ? -1 : 1)
        );

    this.setState({ data, order, orderBy });
  };

  public handleChangePage = (event: any, page: any) => {
    this.setState({ page });
  };
  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  public render() {
    const { data, order, orderBy, rowsPerPage, page }: any = this.state;

    return (
      <div>
        <EnhancedTableToolbar />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n: any) => {
                    const startDateString = getDateTimeHK(n.start_date, "d");
                    const endDateString = getDateTimeHK(n.end_date, "d");
                    return (
                      <TableRow hover={true} key={n.id}>
                        
                          <TableCell padding="none">
                            <Link to={`/campaign/${n.id}/details`}>
                            {n.title}
                            </Link>
                          </TableCell>
                          <TableCell >{startDateString}</TableCell>
                          <TableCell >{endDateString}</TableCell>
                          <TableCell >{n.soft_cap + " / " + n.hard_cap}</TableCell>
                          <TableCell >{n.status}</TableCell>
                        
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default BackedTable;
