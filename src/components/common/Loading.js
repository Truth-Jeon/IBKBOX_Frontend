import React, { useState, useContext, useEffect } from 'react';
import { Spinner } from 'react-spinners-css';

const Loading = () => {
    let styles = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "50", display: "none" };
    return (
        <div style={styles} id="loadingstate">
            <Spinner color={"#123abc"} />
            <p>Loading...</p>
        </div>
    )
};

export default Loading;