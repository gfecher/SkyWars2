import React from "react";
import MuiBox from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";

import _ from "lodash";

import StarWarsService from "../services/starwarsService";

interface StarWarsVehiclesGridProps {}

interface StarWarsVehiclesGridWithState {
  searchTerm: string;
  rowCount: number;
  rows: RowsProp;
  loading: boolean;
  currPage: number;
}

class StarWarsVehiclesGrid extends React.Component<
  StarWarsVehiclesGridProps,
  StarWarsVehiclesGridWithState
> {
  private static readonly COLUMNS: ColDef[] = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "cost_in_credits", headerName: "Cost in credits", width: 200 },
    { field: "length", headerName: "Length", width: 150 }
  ];

  private starWarsService: StarWarsService;

  private loadData = () => {
    this.setState({ loading: true }, () => {
      this.starWarsService
        .getVehicles(this.state.currPage, this.state.searchTerm)
        .then((value: any) => {
          console.log("value", value.results);
          const vehicles: Array<any> = value.results;
          const rows = vehicles.map((v) => {
            return { id: v.name, ...v };
          });
          this.setState({
            rowCount: value.count,
            rows: rows,
            loading: false,
            currPage: 0
          });
        });
    });
  };

  private debouncedLoad = _.debounce(this.loadData, 500);

  constructor(props: StarWarsVehiclesGridProps) {
    super(props);
    this.starWarsService = new StarWarsService();
    this.state = {
      searchTerm: "",
      rowCount: 0,
      rows: [],
      loading: false,
      currPage: 0
    };
  }

  render = () => {
    return (
      <Container maxWidth="md">
        <MuiBox display="flex" justifyContent="center" height="60px" m="8px">
          <TextField
            label="Search vehicles"
            onChange={this.onSearchTermChanged}
          />
        </MuiBox>
        <MuiBox height="75vh" width="100%">
          <DataGrid
            // this is needed to work around a bug in page controlled mode
            // as there is no other easy way to reset the current page number
            key={this.state.searchTerm}
            pageSize={10}
            pagination
            paginationMode="server"
            rowCount={this.state.rowCount}
            rows={this.state.rows}
            onPageChange={this.onPageChange}
            columns={StarWarsVehiclesGrid.COLUMNS}
            loading={this.state.loading}
          />
        </MuiBox>
      </Container>
    );
  };

  private onPageChange = (e) => {
    console.log("e", e);
    this.setState(
      {
        currPage: e.page
      },
      () => this.loadData()
    );
  };

  private onSearchTermChanged = (event: any) => {
    this.setState(
      {
        searchTerm: event.target.value,
        currPage: 0
      },
      () => this.debouncedLoad()
    );
  };

  componentDidMount() {
    this.loadData();
  }
}

export default StarWarsVehiclesGrid;
