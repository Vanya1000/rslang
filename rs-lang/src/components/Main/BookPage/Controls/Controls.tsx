import {
  Button,
  Card,
  Grid,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import GrassIcon from '@mui/icons-material/Grass';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  fetchHardWords,
  setCurrentGroup,
  setCurrentPage,
} from '../../../../store/bookSlice';
import { useNavigate } from 'react-router-dom';
import {
  fetchGameWords,
  resetGame,
  setGame,
  setGameGroup,
  setGamePage,
} from '../../../../store/gameSlice';
import { GameType } from '../../../../types/type';
import { getGameRoute } from '../../GamePage/common';

type ControlsPropsType = {
  isAuth: boolean;
  currentGroup: number;
  currentPage: number;
};

const Controls: React.FC<ControlsPropsType> = ({
  isAuth,
  currentGroup,
  currentPage,
}) => {
  const isLearnedPage =
    useAppSelector((state) => state?.book?.words).filter(
      (word) =>
        word.userWord?.difficulty === 'learned' ||
        word.userWord?.difficulty === 'difficult'
    ).length === 20;
  const isFetching = useAppSelector((state) => state.book.isFetching);

  const currentGameGroup = useAppSelector((state) => state.book.currentGroup);
  const currentGamePage = useAppSelector((state) => state.book.currentPage);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const matches540 = useMediaQuery('(max-width:540px)');
  const matches370 = useMediaQuery('(max-width:370px)');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment <= '5') {
      dispatch(setCurrentPage(0));
      dispatch(setCurrentGroup(+newAlignment));
    } else if (newAlignment === '6') {
      dispatch(setCurrentPage(0));
      dispatch(setCurrentGroup(+newAlignment));
      dispatch(fetchHardWords());
    }
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value - 1));
  };

  const startGame = (game: GameType) => {
    dispatch(resetGame());
    dispatch(setGame({ game, isFromBook: true }));
    dispatch(setGameGroup(currentGameGroup));
    dispatch(setGamePage(currentGamePage));
    dispatch(fetchGameWords());
    navigate(getGameRoute(game));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        { isAuth && <Card sx={{ p: 1, mt: 1, display: 'flex' }}>
          <Tooltip title="Start game" arrow placement="left">
            <>
              <Button
                sx={{ mr: 2 }}
                variant="outlined"
                size={matches540 ? 'small' : 'large'}
                startIcon={<AudiotrackIcon />}
                disabled={isLearnedPage || currentGameGroup === 6}
                onClick={() => startGame('audioChallenge')}
              >
                Audio challenge
              </Button>
              <span />
            </>
          </Tooltip>
          <Tooltip title="Start game" arrow placement="right">
            <>
              <Button
                variant="outlined"
                size={matches540 ? 'small' : 'large'}
                disabled={isLearnedPage || currentGameGroup === 6}
                startIcon={<GrassIcon />}
                onClick={() => startGame('sprint')}
              >
                Sprint
              </Button>
              <span />
            </>
          </Tooltip>
        </Card>}
      </Grid>
      <Grid item xs={12} sx={matches370 ? { width: '100%' } : {}}>
        <Card sx={{ p: 1, mt: 1 }}>
          <ToggleButtonGroup
            value={String(currentGroup)}
            exclusive
            onChange={handleChange}
            size={matches540 ? 'small' : 'medium'}
            orientation={matches370 ? 'vertical' : 'horizontal'}
            fullWidth={matches370}
          >
            <ToggleButton
              sx={{
                backgroundColor: '#ffef62',
                '&:hover': { background: '#b2a429' },
              }}
              value="0"
            >
              Lvl 1
            </ToggleButton>
            <ToggleButton
              sx={{
                backgroundColor: '#ffcd38',
                '&:hover': { background: '#b28704' },
              }}
              value="1"
            >
              Lvl 2
            </ToggleButton>
            <ToggleButton
              sx={{
                backgroundColor: '#a2cf6e',
                '&:hover': { background: '#618833' },
              }}
              value="2"
            >
              Lvl 3
            </ToggleButton>
            <ToggleButton
              sx={{
                backgroundColor: '#33ab9f',
                '&:hover': { background: '#00695f' },
              }}
              value="3"
            >
              Lvl 4
            </ToggleButton>
            <ToggleButton
              sx={{
                backgroundColor: '#6573c3',
                '&:hover': { background: '#2c387e' },
              }}
              value="4"
            >
              Lvl 5
            </ToggleButton>
            <ToggleButton
              sx={{
                backgroundColor: '#af52bf',
                '&:hover': { background: '#6d1b7b' },
              }}
              value="5"
            >
              Lvl 6
            </ToggleButton>
            {isAuth && (
              <ToggleButton
                sx={{
                  backgroundColor: '#f6685e',
                  '&:hover': { background: '#aa2e25' },
                }}
                value="6"
              >
                difficult words
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
        {currentGroup !== 6 && (
          <Pagination
            color={isLearnedPage && !isFetching ? 'secondary' : 'standard'}
            onChange={changePage}
            page={currentPage + 1}
            size={matches370 ? 'medium' : 'large'}
            count={30}
            boundaryCount={matches540 ? 0 : 2}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Controls;
