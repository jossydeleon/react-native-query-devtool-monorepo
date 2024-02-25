import "./style.css";
import useQueryDevtoolData from "./useQueryDevtoolData";
import Placeholder from "../../components/Placeholder";
import Searchbar from "../../components/Searchbar";
import QueryDetails from "../../components/QueryDetails";

const QueryDevtool = () => {
  const {
    queries,
    filteredQueries,
    selectedQuery,
    queryLastUpdated,
    filter,
    setFilter,
    handleSelectedRow,
  } = useQueryDevtoolData();

  if (queries.length === 0) {
    return <Placeholder />;
  }

  return (
    <div className="container">
      <div className="header">
        <Searchbar value={filter} setValue={setFilter} />
      </div>

      <div className="row">
        <div className="column">
          <div className="table-container">
            <table>
              <tbody>
                {filteredQueries.map((query, index) => (
                  <tr key={index} onClick={() => handleSelectedRow(index)}>
                    <td>
                      <div
                        className="observers-container"
                        style={{
                          backgroundColor:
                            query.observers === 0
                              ? "gray"
                              : query.isFetching
                              ? "blue"
                              : query.isStale
                              ? "orange"
                              : "green",
                        }}
                      >
                        <span className="observer-text">
                          {query.observers ?? 0}
                        </span>
                      </div>
                    </td>
                    <td
                      className={
                        query.queryKey === selectedQuery?.queryKey
                          ? "table-row-selected"
                          : "table-row"
                      }
                    >
                      <span
                        className="table-row-selected-text"
                        style={{ color: "white" }}
                      >
                        {JSON.stringify(query.queryKey)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedQuery && <div className="spacer" />}

        <QueryDetails
          selectedQuery={selectedQuery}
          queryLastUpdated={queryLastUpdated}
        />
      </div>
    </div>
  );
};

export default QueryDevtool;
