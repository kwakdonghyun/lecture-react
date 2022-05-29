import { formatRelativeDate } from "./js/helpers.js";
import store from "./js/Store.js";


const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
};

const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
};


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "", // 검색에들어가는 input값 
            searchResult: [], // 검색결과
            submitted: false,
            selectedTab: TabType.KEYWORD,
            keywordList: [],
            historyList: [],
        }
    }

    componentDidMount() {
        const keywordList = store.getKeywordList()
        const historyList = store.getHistoryList()
        this.setState({ keywordList, historyList })
    }

    handleChangeInput(event) {
        // this.state.searchKeyword = event.target.value
        // this.forceUpdate();
        const searchKeyword = event.target.value
        if (searchKeyword.length <= 0 && this.state.submitted) {
            return this.handleReset()
        }
        this.setState({
            searchKeyword: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault() // 화면리프레시 막는다.
        console.log('handleSubmit', this.state.searchKeyword)
        this.search(this.state.searchKeyword) // 검색어를 받아서 검색결과를 만들어주는 함수
    }

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword)
        const historyList = store.getHistoryList() 

        this.setState({
            searchKeyword,
            searchResult,
            submitted: true,
            historyList,
        })
    }

    handleReset() {
        console.log('handleReset')
        this.setState({
            searchKeyword: "",
            submitted: false,
            searchResult: [],
        })
    }

    handleClickRemoveHistory(event, keyword) {
        event.stopPropagation(); // event 전파를 차단한다 버블링되지않게한다.

        store.removeHistory(keyword)
        const historyList = store.getHistoryList();
        this.setState({ historyList })
    }

    // render 오버라이딩
    render() { // react Element를 반환

        const searchForm = (
            <form
                onSubmit={event => this.handleSubmit(event)}
                onReset={() => this.handleReset()}
            >
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    autoFocus
                    name='searchForm'
                    value={this.state.searchKeyword}
                    // onChange={this.handleChange}
                    onChange={event => this.handleChangeInput(event)}
                />

                {/* 조건부 렌더링 */}
                {this.state.searchKeyword.length > 0 && (
                    <button
                        type="reset"
                        className="btn-reset"
                    >
                    </button>
                )}
            </form>
        )

        const searchResult = (
            this.state.searchResult.length > 0 ? (
                <ul className='result'>
                    {this.state.searchResult.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <p>{item.name}</p>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className='empty-box'>검색 결과가 없습니다.</div>
            )
        )

        const keywordList = (
            <ul className='list'>
                {this.state.keywordList.map(({ id, keyword }, index) => {
                    return (
                        <li onClick={() => {
                            this.search(keyword)
                        }
                        }
                            key={id}>
                            <span className='number'>{index + 1}</span>
                            <span>{keyword}</span>
                        </li>
                    )
                })}
            </ul>
        )

        const historyList = (
            <ul className='list'>
                {this.state.historyList.map(({ id, keyword, date }) => {
                    return (
                        <li key={id} onClick={() => this.search(keyword)}>
                            <span>{keyword}</span>
                            <span className='date'>{formatRelativeDate(date)}</span>
                            <button
                                className='btn-remove'
                                onClick={event => this.handleClickRemoveHistory(event, keyword)}
                            />

                        </li>
                    )
                })}
            </ul>
        )

        const tabs = (
            <>
                <ul className='tabs'>
                    {Object.values(TabType).map(tabType => {
                        return (
                            <li
                                className={this.state.selectedTab === tabType ? 'active' : ''}
                                key={tabType}
                                onClick={() =>
                                    this.setState({
                                        selectedTab: tabType
                                    })
                                }
                            >
                                {TabLabel[tabType]}
                            </li>
                        )
                    })}
                </ul>
                {this.state.selectedTab === TabType.KEYWORD && <>{keywordList}</>}
                {this.state.selectedTab === TabType.HISTORY && <>{historyList}</>}
            </>
        )


        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {searchForm}
                    <div className='content'>
                        {this.state.submitted ? searchResult : tabs}
                    </div>
                </div>
            </>
        )
    }
}

// 컴포넌넌트화 해줘야한다. <App/> 써주면 App은 react Element를 반환하게된다.
// ReactDom이 가상돔을 그리고 실제돔에게 반환
ReactDOM.render(<App />, document.querySelector("#app"));