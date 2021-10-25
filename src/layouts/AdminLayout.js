import React from "react";
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { Container } from "react-bootstrap";
const AdminLayout = (props) => {
    return (
        <>
            <div className="wrap">
                <Header/>
                <main className="contents">
                    <Container>
                    {props.children}
                    </Container>
                </main>
                <Footer/>
            </div>
        </>
    )
};

export default AdminLayout;