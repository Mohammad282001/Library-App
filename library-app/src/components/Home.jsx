import React from "react";
import MainComp from "./MainComponent";
import FooterComp from "./FooterComponent";
import HeaderComp from "./HeaderComponent";

function Home(){
    return (<>
        <HeaderComp />
        <MainComp />
        <FooterComp />
    </>)
}

export default Home;