import './AudioChallenge.css';
import volume from '../../../../assets/volume.png';
import img from '../../../../assets/lights.jpg';

const AudioChallenge = () => {
    const data = {
        "id": "5e9f5ee35eb9e72bc21b006f",
        "group": 5,
        "page": 1,
        "word": "attain",
        "image": "files/02_3024.jpg",
        "audio": "files/02_3024.mp3",
        "audioMeaning": "files/02_3024_meaning.mp3",
        "audioExample": "files/02_3024_example.mp3",
        "textMeaning": "To <i>attain</i> something is to succeed at something or to get something you want.",
        "textExample": "If you want to <b>attain</b> a healthy body, you must exercise every day.",
        "transcription": "[ətéin]",
        "textExampleTranslate": "Если вы хотите достичь здорового тела, вы должны заниматься каждый день",
        "textMeaningTranslate": "Достигнуть чего-либо - значит добиться успеха в чем-то или получить то, что вы хотите",
        "wordTranslate": "достичь"
      };

    const progressView = () => {
        const diagramBox = document.querySelector('.diagram') as HTMLDivElement;
        const deg: number = (360 * Number(diagramBox.dataset.percent) / 100) + 180;
        if (Number(diagramBox.dataset.percent) >= 50){
            diagramBox.classList.add('over_50');
        } else {
            diagramBox.classList.remove('over_50');
        }
        (diagramBox.querySelector('.piece.right') as HTMLDivElement).style.transform = 'rotate('+deg+'deg)';
    }

    const animate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const x = e.clientX;
        const y = e.clientY;
      
        const buttonTop = target.offsetTop;
        const buttonLeft = target.offsetLeft;
      
        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;
      
        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';
        target.appendChild(circle);

        setTimeout(() => circle.remove(), 500);
    }

    return (
        <div className='audio-challenge'>
            <div className='audio-challenge__header'>

                <div className="diagram progress" data-percent="0">
                    <div className="piece left"></div>
                    <div className="piece right"></div>
                    <div className="text">
                        <div>
                            <b>0</b>
                            <span>PERCENT</span>
                        </div>
                    </div>
                </div>

                <h2 className='header__title'>AUDIO CHALLENGE</h2>
            </div>

            <div className='audio-challenge__main'>
                <div className='audio-challenge__content'>
                    <img className='content__image' src={img} alt='image'/>
                    <div className='content__wrapper'>
                        <img className='content__volume' src={volume} alt='volume'/>
                        <span className='content__word'>{data.word}</span>
                    </div>
                    <ul className='content__list'>
                        <li className='list__item'>{data.wordTranslate}</li>
                        <li className='list__item'>обитать</li>
                        <li className='list__item'>обогатить</li>
                        <li className='list__item'>процветать</li>
                    </ul>
                    <button className='content__button' onClick={(e) => animate(e)}>NEXT</button>
                </div>
            </div>

        </div>
    )
}

export default AudioChallenge;