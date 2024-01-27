import React, { useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import classes from "./Home.module.css";
import Button from "../../Components/Buttons/Button";

const TABLE_DATA0 = [ // Proxima Competicao
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
]

const ORDER_OPTIONS = ["Mais recente", "Mais antigo", "Nome"]

const TABLE_DATA = [ // Competicoes Inscritas
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 2,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 3,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 4,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 5,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 6,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 7,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 8,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 9,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 10,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    // Add more data as needed
];

function Home(props) {
    let container = classes.container;
    let [selectedOrder, setSelectedOrder] = useState("Mais recente");
    let minComp=1, maxComp=8, totalComp=80;
    let currentPage=0, totalPages=2, onPageChange=3, itemsPerPage = 8;

    // Dropdown options
    let handleOrderOptionClick = (option) => {
        setSelectedOrder(option);
    };

    //totalComp = total quantity of competitions
    if (totalComp < maxComp) {
        maxComp = totalComp;
    }

    totalPages = Math.ceil(totalComp / itemsPerPage); // 8 competitions per page

    // React Paginate
    const [currentPage0, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };    

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
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
                        {TABLE_DATA0.map((row) => (
                            <div key={row.id} className={classes.tableRow0}>
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
                </div>

                <div className={classes.box}>
                    {/* Title and Buttons - Competicoes Inscritas*/}
                    <div className={classes.titleContainer}>
                        <h2>Competições Inscritas</h2>
                        <div className={classes.titleContainerButtons}>
                            <input 
                                className={classes.buttonSearch} 
                                placeholder="Pesquisar"
                            ></input>

                            <div className={classes.dropdown}>
                                <button className={classes.buttonDropdown}>
                                    Ordenar por: {selectedOrder}
                                </button>
                                <div className={classes.listDropdown}>
                                    {ORDER_OPTIONS.map((option) => (
                                        <a
                                            key={option}
                                            href="#"
                                            onClick={() => handleOrderOptionClick(option)}
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
                        {TABLE_DATA.map((row) => (
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
                        <span>Dados {currentPage0 * itemsPerPage + 1} a {Math.min((currentPage0 + 1) * itemsPerPage, totalComp)} de {totalComp} entradas</span>
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