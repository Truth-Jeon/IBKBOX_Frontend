import React from 'react';
import 'assets/styles/news.css'

const Card = (props) => {
    const {id, type, topic, title, date, tags} = props;
    const color = {
        tips: 'yellow',
        report: 'blue',
        economic: 'boldpurple',
        magazine: 'green',
        financialMarket: 'emerald',
        consulting: 'sky',
        property: 'gold'
    }
    console.log(props)
    return(
        <>
            <div className={`news__card__inner newscard1 card-${color[type]}`} onClick={()=>console.log(id)}>
                <div className="news__scroll">
                    <p className="news__date">
                        {date}
                    </p>
                    <p className={`news__topic text-${color[type]}`}>
                        {topic}
                    </p>
                    <p className="news__title">
                        {title} 
                    </p>
                    <ul className='news__related'>
                        {tags.map((tag) => {
                            return(
                                    <li>
                                        {tag}
                                    </li>
                            )
                            
                        })}
                    </ul> 
                </div>
            </div>
        </>
    )
}

export default Card