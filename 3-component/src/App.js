import React from "react";
import Header from "./components/Header.js";

// export default : 모듈로 등록 
export default class App extends React.Component {
    render() {
        return (
            <>
                <Header title="검색" />
                <Header title="프로필" />
                <Header title="상품" />
            </>
        )
    }
}