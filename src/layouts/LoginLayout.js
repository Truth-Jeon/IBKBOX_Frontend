import React from "react";

const LoginLayout = (props) => {
    return (
        <>
            <div>
                <main>
                    {props.children}
                </main>                
            </div>                    
        </>
    )
};

export default LoginLayout;