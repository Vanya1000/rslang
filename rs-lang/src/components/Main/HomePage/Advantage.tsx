import { useState } from 'react';

const Advantage = (props: {id: number, title: string}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`advantages__item item_${props.id}${isActive ? ' advantages__item_active' : ''}`}
        onClick={() => setIsActive((prev) => !prev)}>
            <p className={isActive ? 'rotated' : ''}>{isActive ? props.title : '#' + props.id}</p>
        </div>
    )

}

export default Advantage;