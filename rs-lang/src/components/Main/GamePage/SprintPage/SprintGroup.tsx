import { Typography } from '@mui/material';

import GameGroupButton from '../GameGroupButton';

import '../Game.css';



const SprintGroup = () => {
  return (
    <div className='sprint'>
      <div className='sprint__wrapper'>
        <Typography variant="h4" component="h2" align='center' sx={{margin: '80px 0 50px 0'}}>
          Sprint
        </Typography>
        <div className='sprint__description' >
          Check how much points you can get in one minute,
          making educated guesses about what is right and what is wrong.
        </div>
        <div className='level-button__wrapper'>
          {[0, 1, 2, 3, 4, 5].map((index) => <GameGroupButton game='sprint' group={index} key={index}/>)}
        </div>
      </div>
    </div>
    )
}

export default SprintGroup;
