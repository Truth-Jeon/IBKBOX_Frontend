import React from 'react';
import 'assets/styles/news.css'

const ScrapCard = (props) => {
    const {id, type, date, topic, title, subtitle} = props;
    const color ={
        tips: 'yellow',
        report: 'blue',
        economic: 'boldpurple',
        magazine: 'green',
        financialMarket: 'emerald',
        consulting: 'sky',
        property: 'gold'
    }

    return(
        <div className={`news__card__inner card-${color[type]} scrap`} onClick={()=>console.log(id)}>
            <div className="news__scroll">
                <p className='news__date'>
                    {date}
                </p>
                <p className={`news__topic text-${color[type]}`}>
                    {topic}
                </p>
                <p className='news__title'>
                    {title}
                </p>
                <p className="news__subtitle">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

export default ScrapCard;