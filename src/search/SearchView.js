import React, { Component } from 'react'
import { Container, Input, Button, Title, Pagination, PageControl, PageList, Page, PageLink, PageEllipsis } from 'bloomer';
import $ from 'jquery'
import APIManager from '../api/APIManager';
import Result from './Result';

/* 
    module to display the search page for games
    authors Riley Mathews
*/

class SearchView extends Component {
    state = {
        searchString: "",
        currentSearch: "",
        results: [],
        waitingMessage: "",
        currentPage: 1,
        totalPages: null
    }

    searchForGame = function () {
        console.log("search fired")
        APIManager.searchGbGames(this.state.searchString, 1)
            .then(response => {
                console.log(response)
                this.setState({
                    totalPages: Math.ceil(response.number_of_total_results / 10),
                    results: response.results,
                    waitingMessage: ""
                })
            })
    }.bind(this)

    changeSearchPage = function (page) {
        APIManager.searchGbGames(this.state.currentSearch, page)
            .then(response => {
                this.setState({
                    results: response.results
                })
            })
    }.bind(this)


    handleSearchInputChanage = function () {
        const inputField = $("#search__input")
        this.setState({ searchString: inputField.val() })
    }.bind(this)

    handleSearchSubmit = function (evt) {
        evt.preventDefault()
        this.setState({ currentSearch: this.state.searchString })
        this.setState({ waitingMessage: "Waiting..." })
        this.searchForGame()
        this.setState({ searchString: "" })
    }.bind(this)

    setPage = function (event) {
        this.setState({ currentPage: parseInt(event.target.textContent, 10) })
        this.changeSearchPage(event.target.textContent)
    }.bind(this)

    incrementPage = function () {
        this.setState({ currentPage: this.state.currentPage + 1 })
        this.changeSearchPage(this.state.currentPage + 1)
    }.bind(this)

    decrementPage = function () {
        this.setState({ currentPage: this.state.currentPage - 1 })
        this.changeSearchPage(this.state.currentPage - 1)
    }.bind(this)

    pageLinkDisplay = function (page) {
        if (page === this.state.currentPage) {
            return <Page><PageLink isCurrent isColor="primary">{page}</PageLink></Page>
        } else {
            return <Page><PageLink onClick={this.setPage}>{page}</PageLink></Page>
        }
    }.bind(this)

    pageDisplay = function () {
        if (this.state.currentPage <= 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    {this.pageLinkDisplay(2)}
                    {this.pageLinkDisplay(3)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        } else if (this.state.currentPage > 3 && this.state.currentPage <= this.state.totalPages - 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.currentPage - 1)}
                    {this.pageLinkDisplay(this.state.currentPage)}
                    {this.pageLinkDisplay(this.state.currentPage + 1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        } else if (this.state.currentPage >= this.state.totalPages - 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages - 2)}
                    {this.pageLinkDisplay(this.state.totalPages - 1)}
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        }
    }.bind(this)

    paginationDisplay = function () {
        if (this.state.results.length === 0) {
            return null
        } else {
            return (
                <Pagination>
                    <PageControl onClick={this.decrementPage}>Previous</PageControl>
                    <PageControl onClick={this.incrementPage} isNext>Next</PageControl>
                    {this.pageDisplay()}
                </Pagination>
            )
        }
    }.bind(this)

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSearchSubmit}>
                    <Input id="search__input" onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                    <Button id="search__submit" isColor="primary" type="submit">Search</Button>
                    <Title>{this.state.waitingMessage}</Title>
                    {this.state.results.map(result => (
                        <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGame} />
                    ))}
                    {this.paginationDisplay()}
                </form>
            </Container >
        )
    }
}

export default SearchView
