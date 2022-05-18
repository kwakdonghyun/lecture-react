import store from "./js/Store.js";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "", // 검색에들어가는 input값 
            searchResult: [], // 검색결과
            submitted: false,
        }
    }

    handleChangeInput(event) {
        // this.state.searchKeyword = event.target.value
        // this.forceUpdate();
        const searchKeyword = event.target.value
        if (searchKeyword.length <= 0) {
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
        this.setState({
            searchResult,
            submitted: true,
        })
    }

    handleReset() {
        console.log('handleReset')
        this.setState(
            () => {
                return { searchKeyword: "" }
            },
            () => {

            })
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

        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {searchForm}
                    <div className='content'>
                        {this.state.submitted && searchResult}
                    </div>
                </div>
            </>
        )
    }
}

// 컴포넌넌트화 해줘야한다. <App/> 써주면 App은 react Element를 반환하게된다.
// ReactDom이 가상돔을 그리고 실제돔에게 반환
ReactDOM.render(<App />, document.querySelector("#app"));