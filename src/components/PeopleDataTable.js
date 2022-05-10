import React, { Component } from "react";

// components
import Datatable from "./DataTable";
import Loading from "./Loading";

// utilities
import makeData from "../utilities/makeData";

// filters
import { DropdownFilter, TextSearchFilter } from "../utilities/filters";

const data = makeData(20);

const columns = [
  {
    Header: "First Name",
    accessor: "firstName",
    Filter: TextSearchFilter,
    filter: "rankedMatchSorter"
  },
  {
    Header: "Last Name",
    accessor: "lastName",
    Filter: TextSearchFilter
  },
  {
    Header: "Age",
    accessor: "age"
  },
  {
    Header: "Visits",
    accessor: "visits"
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: DropdownFilter
  },
  {
    Header: "Profile Progress",
    accessor: "progress"
  }
];

const initialState = {
  sortBy: [
    {
      id: "lastName",
      desc: false
    }
  ],
  filters: [
    {
      id: "status",
      value: "single"
    }
  ]
};

class PeopleDataTable extends Component {
  // Loading must be handled here because DataTable MUST have data on load
  renderTable() {
    if (!data) {
      return <Loading />;
    } else {
      return (
        <Datatable data={data} columns={columns} initialState={initialState} />
      );
    }
  }

  render() {
    return <>{this.renderTable()}</>;
  }
}

export default PeopleDataTable;
