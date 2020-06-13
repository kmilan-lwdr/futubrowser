import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import PropTypes from 'prop-types';

const NEIGHBOURS = 2;
const START = '|<';
const PREVIOUS = '<';
const NEXT = '>';
const END = '>|';
const BREAK = '...';

class PaginationBar extends Component {
    constructor(props) {
        super(props);
        this.generateButtonArray = this.generateButtonArray.bind(this);
    }   

    generateButtonArray(currentPage, totalPages) {

        const range = (from, to, step = 1) => {
            let i = from;
            const range = [];
          
            while (i <= to) {
              range.push(i);
              i += step;
            }
          
            return range;
        }

        let buttons = [];
        
        // If current page is not the first, add "start" and "previous" buttons before the numbered buttons
        if (currentPage > 1 ){
            buttons.push(START);
            buttons.push(PREVIOUS);
        }

        // Visible page numbers
        let start = Math.max(1, currentPage - NEIGHBOURS);
        let end = Math.min(totalPages, currentPage + NEIGHBOURS);
        let visiblePages = 1 + 2 * NEIGHBOURS;

        // Add ... when first page number not visible
        if(start > 1)
        {
            buttons.push(BREAK);
        }

        // Always show max visible page numbers if totalPages exceeds it
        if(end < visiblePages && totalPages >= visiblePages)
        {
            end = Math.min(visiblePages, currentPage + 1 + NEIGHBOURS * 2);
        }
        if(start > totalPages  - NEIGHBOURS * 2)
        {
            start = Math.max(1, totalPages  - NEIGHBOURS * 2)
        }

        buttons = buttons.concat(range(start, end));

        // Add ... when last page number not visible
        if(end < totalPages)
        {
            buttons.push(BREAK);
        }

        // If current page is not the last, add "end" and "next" -buttons after the numbered buttons
        if (currentPage < totalPages){
            buttons.push(NEXT);
            buttons.push(END);
        }

        return buttons;
    }


    render() {
        if (this.props.totalPages === 1) return null;
        const pages = this.generateButtonArray(this.props.query._page, this.props.totalPages);

        return (
        
        <div className="row centered paginationBar">
            {
                pages.map((page, index) => {
                    let pageNo;
                    
                    if (page === START) {
                        pageNo = 1;
                    }
                    else if (page === PREVIOUS) {
                        pageNo = this.props.query._page - 1;
                    }
                    else if (page === NEXT) {
                        pageNo = this.props.query._page + 1;
                    }
                    else if (page === END) {
                        pageNo = this.props.totalPages;
                    }
                    else if (page === BREAK) {
                        return (
                            <span key={index} className="break">{page}</span>
                        );
                    }
                    else {
                        pageNo = page;
                    }
                    
                    return (
                        <Link 
                            to={this.props.path + "?" + queryString.stringify({...this.props.query, _page: pageNo})} 
                            key={index} 
                            className={`button ${this.props.query._page === pageNo ? 'active' : ''}`} >
                            {page}
                        </Link>
                    );
                })
            }

        </div>
        
        );

  }
}

PaginationBar.propTypes = {
    query: PropTypes.object,
    totalPages: PropTypes.number,
    path: PropTypes.string
};

export default PaginationBar;