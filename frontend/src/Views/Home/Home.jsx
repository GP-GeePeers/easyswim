import React, { useState , useEffect} from "react";
import ReactPaginate from "react-paginate";
import classes from "./Home.module.css";
import Button from "../../Components/Buttons/Button";

function Home(props) {
    const [TABLE_DATA, setTableData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    let [selectedOrder, setSelectedOrder] = useState("Mais recente");

    const ORDER_OPTIONS = ["Mais recente", "Mais antigo", "Nome"];

    const TABLE_DATA0 = [ // Proxima Competicao
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 2,
        organizer: "BAssociação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-06-2023",
        state: "inactive"
    },
    {
        id: 3,
        organizer: "CAssociação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-05-2024",
        state: "active"
    },
]

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/meets-data/");
            const data = await response.json();
            const currentDate = new Date();
    
            const updatedTableData = data.meets.map((meet) => {
              const meetDate = new Date(meet.deadline);
              const isActive = meetDate >= currentDate;
    
              return {
                id: meet.id,
                organizer: meet.organizer,
                name: meet.name,
                date: meet.deadline,
                state: isActive ? "active" : "inactive",
              };
            });
    
            setTableData(updatedTableData);
            
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchData();
    });
    
    const tableDataLength = TABLE_DATA ? TABLE_DATA.length : 0;
       

//////
    let container = classes.container;
    let itemsPerPage = 8;
    var totalPages;

    // Dropdown options
    let handleOrderOptionClick = (option) => {
        console.log(option);
        TABLE_DATA0?.filter(
            (row) =>
            row.organizer.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) => {
                if (selectedOrder === "Mais antigo") {
                    return new Date(a.date) - new Date(b.date);
                } else if (selectedOrder === "Nome") {
                    return a.name.localeCompare(b.name);
                } else {
                    return new Date(b.date) - new Date(a.date);
                }
            })
        console.log(TABLE_DATA0)
        setSelectedOrder(option);
    };

    totalPages = Math.ceil(tableDataLength / itemsPerPage); // 8 competitions per page

    // React Paginate
    const [currentPage0, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };    

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    };

    // Next competition
    function getNextCompetition(tableData) {
        if (!tableData || !Array.isArray(tableData)) {
            // If tableData is undefined or not an array, return null
            return null;
        }
    
        const currentDate = new Date();
    
        for (const meet of tableData) {
            if (!meet || typeof meet !== 'object' || !meet.date) {
                // Skip invalid meets without a date
                continue;
            }
    
            const meetDate = new Date(meet.date);
    
            if (meet.state === 'active' && meetDate >= currentDate) {
                return meet;
            }
        }
    
        return null;
    };
    

    // HTML
    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <div className={classes.box}>
                    {/* Title 0 - Proxima Competicao*/}
                    <div className={classes.titleContainer}>
                        <h2>Próxima Competição</h2>
                    </div>

                    {/* Table 0 */}
                    <div className={classes.table}>
                        {getNextCompetition(TABLE_DATA) && (
                            <div key={getNextCompetition(TABLE_DATA).id} className={classes.tableRow0}>
                                <div className={`${classes.tableCell} ${classes.organizerColumn}`}>{getNextCompetition(TABLE_DATA).organizer}</div>
                                <div className={`${classes.tableCell} ${classes.nameColumn}`}>{getNextCompetition(TABLE_DATA).name}</div>
                                <div className={`${classes.tableCell} ${classes.dateColumn}`}>{getNextCompetition(TABLE_DATA).date}</div>
                                <div className={`${classes.tableCell} ${classes.stateColumn}`}>
                                    {getNextCompetition(TABLE_DATA).state === "active" ? (
                                        <Button
                                            text={getNextCompetition(TABLE_DATA).state}
                                            disabled={true}
                                        />
                                    ) : (
                                        <Button
                                            text={getNextCompetition(TABLE_DATA).state}
                                            type="secondary"
                                            disabled={true}
                                        />
                                    )} 
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={classes.box}>
                    {/* Title and Buttons - Competicoes Inscritas*/}
                    <div className={classes.titleContainer}>
                        <h2>Competições Inscritas</h2>
                        <div className={classes.titleContainerButtons}>
                            <input 
                                className={classes.buttonSearch} 
                                placeholder="Pesquisar"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            ></input>

                            <div className={classes.dropdown}>
                                <button className={classes.buttonDropdown}>
                                    Ordenar por: {selectedOrder}
                                </button>
                                <div className={classes.listDropdown}>
                                    {ORDER_OPTIONS.map((option) => (
                                        <a
                                            key={option}
                                            href="/"
                                            onClick={() => {
                                                handleOrderOptionClick(option);
                                                TABLE_DATA0?.filter(
                                                    (row) =>
                                                    row.organizer.toLowerCase().includes(searchInput.toLowerCase()) ||
                                                    row.name.toLowerCase().includes(searchInput.toLowerCase())
                                                )
                                                .sort((a, b) => {
                                                    if (selectedOrder === "Mais antigo") {
                                                    return new Date(a.date) - new Date(b.date);
                                                    } else if (selectedOrder === "Nome") {
                                                    return a.name.localeCompare(b.name);
                                                    } else {
                                                    return new Date(b.date) - new Date(a.date);
                                                    }
                                                })
                                                }
                                            }
                                        >
                                            {option}
                                        </a>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className={classes.table}>
                        <div className={classes.tableRow + " " + classes.tableHeader}>
                            <div className={classes.tableRowHeader}>
                                <div className={`${classes.tableCellHeader} ${classes.organizerColumn}`}>ORGANIZADOR</div>
                                <div className={`${classes.tableCellHeader} ${classes.nameColumn}`}>NOME</div>
                                <div className={`${classes.tableCellHeader} ${classes.dateColumn}`}>DATA</div>
                                <div className={`${classes.tableCellHeader} ${classes.stateColumn}`}>ESTADO</div>
                            </div>
                        </div>
                        {TABLE_DATA0?.map((row) => (
                            <div key={row.id} className={classes.tableRow}>
                                <div className={`${classes.tableCell} ${classes.organizerColumn}`}>{row.organizer}</div>
                                <div className={`${classes.tableCell} ${classes.nameColumn}`}>{row.name}</div>
                                <div className={`${classes.tableCell} ${classes.dateColumn}`}>{row.date}</div>
                                <div className={`${classes.tableCell} ${classes.stateColumn}`}>
                                    {row.state === "active" ? (
                                        <Button
                                            text={row.state}
                                            disabled={true}
                                        />
                                    ) : (
                                        <Button
                                            text={row.state}
                                            type="secondary"
                                            disabled={true}
                                        />
                                    )} 
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Page Number and Buttons */}
                    <div className={classes.pageContainer}>
                        <span>Dados {currentPage0 * itemsPerPage + 1} a {Math.min((currentPage0 + 1) * itemsPerPage, tableDataLength )} de {tableDataLength} entradas</span>
                        <div className={classes.pageContainerButtons}>

                            <ReactPaginate
                                pageCount={totalPages}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                onPageChange={handlePageChange}
                                containerClassName={classes.paginationContainer}
                                pageClassName={classes.paginationPage}
                                activeClassName={classes.paginationActive}
                                previousClassName={classes.paginationPrevious}
                                nextClassName={classes.paginationNext}
                                previousLabel={"<"}
                                nextLabel={">"}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;