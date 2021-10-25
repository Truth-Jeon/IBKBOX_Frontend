import React from "react";

const MemberLayout = (props) => {
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

export default MemberLayout;