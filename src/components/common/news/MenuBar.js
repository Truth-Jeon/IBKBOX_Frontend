import React from "react";

const MenuBar = (props) => {
    const {title} = props;
    return(
                                        <div className='news__info'>
                                            <div className='news__info__title'>
                                            {title}
                                            </div>
                                        <div className='news__info__more'>
                                            <img src={require("assets/images/more_plus.png").default} alt="more btn" />
                                                더보기
                                            </div>
                                        </div>
    )
}

export default MenuBar