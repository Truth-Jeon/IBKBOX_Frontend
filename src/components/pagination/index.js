import React from 'react';

import "assets/styles/template/argon/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = (props) => {

    const { setPage } = props;
    const { totalPages, number, first, last } = props.pageInfo;
    const pageList = [];

    let records = 10; // 페이장 당 리스트 건수
    let slice = 3; // 페이지 넘버 수

    let tempEnd = Math.ceil(number / slice) * slice;
    let start = tempEnd - (slice - 1);
    let end = totalPages > tempEnd ? tempEnd : totalPages;

    for (let i = start; i <= end; i++) {
        pageList.push(i - 1);
    }

    return (

        <Pagination
            className="pagination justify-content-center mb-0"
            listClassName="justify-content-end mb-0"
        >

            <PaginationItem className={first ? "disabled" : ""}>
                <PaginationLink
                    onClick={() => {
                        setPage({ records: records, page: number - 1, });
                    }}
                >
                    <i className="fas fa-angle-left" />
                </PaginationLink>
            </PaginationItem>

            {
                pageList.map((item, key) => {
                    return (
                        <PaginationItem className={item === number - 1 ? 'active' : ''} key={key}>
                            <PaginationLink
                                onClick={() => {
                                    setPage({ records: records, page: item + 1 });
                                }}
                            >
                                {item + 1}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })
            }

            <PaginationItem className={last ? "disabled" : ""}>
                <PaginationLink
                    onClick={() => {
                        setPage({ records: records, page: number + 1 });
                    }}
                >
                    <i className="fas fa-angle-right" />
                </PaginationLink>
            </PaginationItem>

        </Pagination>
    )
}

export default PaginationComponent;