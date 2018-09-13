import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
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
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import classNames from "classnames";
import * as keycode from "keycode";
import * as React from "react";

interface IEnhancedTableHeadProps {
  onRequestSort: (event: any, property: any) => void;
  numSelected: number;
  onSelectAllClick: (event: any, checked: any) => void;
  order: string;
  orderBy: string;
  rowCount: number;
}

let counter = 0;

function createData(
  name: any,
  calories: any,
  fat: any,
  carbs: any,
  protein: any
) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title"
  },
  { id: "start day", numeric: true, disablePadding: false, label: "Start day" },
  { id: "end day", numeric: true, disablePadding: false, label: "End day" },
  {
    id: "cap",
    numeric: true,
    disablePadding: false,
    label: "Soft / hard cap"
  },
  { id: "backers", numeric: true, disablePadding: false, label: "Backers" }
];

class EnhancedTableHead extends React.Component<IEnhancedTableHeadProps> {
  public createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  };

  public render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    }: any = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
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

interface IEnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: IEnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      className={classNames("table-header", {
        ["highlight-light"]: numSelected > 0
      })}
    >
      <div className="title">
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Followed Campaign</Typography>
        )}
      </div>
      <div className="spacer" />
      <div className="actions">
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

interface IEnhancedTableState {
  orderBy: string;
  order: string;
  selected: any;
  data: any;
  page: number;
  rowsPerPage: number;
}

// tslint:disable-next-line:max-classes-per-file
class FollowedTable extends React.Component<any, IEnhancedTableState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      data: [
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Donut", 452, 25.0, 51, 4.9),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
        createData("Honeycomb", 408, 3.2, 87, 6.5),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Jelly Bean", 375, 0.0, 94, 0.0),
        createData("KitKat", 518, 26.0, 65, 7.0),
        createData("Lollipop", 392, 0.2, 98, 0.0),
        createData("Marshmallow", 318, 0, 81, 2.0),
        createData("Nougat", 360, 19.0, 9, 37.0),
        createData("Oreo", 437, 18.0, 63, 4.0)
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    };
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
  public handleSelectAllClick = (event: any, checked: any) => {
    if (checked) {
      this.setState({ selected: this.state.data.map((n: any) => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  public handleKeyDown = (event: any, id: any) => {
    if (keycode(event) === "space") {
      this.handleClick(event, id);
    }
  };
  public handleClick = (event: any, id: any) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };
  public handleChangePage = (event: any, page: any) => {
    this.setState({ page });
  };
  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  public isSelected = (id: any) => this.state.selected.indexOf(id) !== -1;

  public render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    }: any = this.state;

    return (
      <div>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              {/* <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n: any) => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover={true}
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={event => this.handleClick(event, n.id)}
                        // tslint:disable-next-line:jsx-no-lambda
                        onKeyDown={event => this.handleKeyDown(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" checked={isSelected} />
                        </TableCell>
                        <TableCell padding="none">{n.name}</TableCell>
                        <TableCell numeric={true}>{n.calories}</TableCell>
                        <TableCell numeric={true}>{n.fat}</TableCell>
                        <TableCell numeric={true}>{n.carbs}</TableCell>
                        <TableCell numeric={true}>{n.protein}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody> */}
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

export default FollowedTable;
