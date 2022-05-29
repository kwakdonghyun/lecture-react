import React from "react";

// jsx문법을 쓰는경우 상단에 react라이브러리 넣어줘야함
const Header = (props) => {
    return (
        <header>
            <h2 className="container">{props.title}</h2> {/* 재활용할수있게만든다. */}
        </header>
    )
}

export default Header;