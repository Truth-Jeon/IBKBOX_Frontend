import React from 'react';

const NewsInfo = (props) => {
    const title = props;
    return(
        <div className='news__info'>
            <div className='news__info__title'>
            {title}
            </div>
        <div className='news__info__more'>
            <img src="/image/more_plus.png" alt="more btn" />
                더보기
            </div>
        </div>
    )
}

export default NewsInfo