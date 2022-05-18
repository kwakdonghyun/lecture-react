class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
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

        // let resetButton = null;
        // if (this.state.searchKeyword.length > 0) {
        //     resetButton = <button type="reset" className="btn-reset"></button>
        // }

        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
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

                        {this.state.searchKeyword.length > 0 && (
                            <button
                                type="reset"
                                className="btn-reset"
                            >

                            </button>
                        )}
                    </form>
                </div>
            </>
        )
    }
}

// 컴포넌넌트화 해줘야한다. <App/> 써주면 App은 react Element를 반환하게된다.
// ReactDom이 가상돔을 그리고 실제돔에게 반환
ReactDOM.render(<App />, document.querySelector("#app"));