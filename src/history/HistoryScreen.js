import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArrowBack from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ClearIcon from '@material-ui/icons/Clear'
import Typography from '@material-ui/core/Typography'

import { clearHistory } from '../reducers/history'
import HistoryDay from './HistoryDay'

export default function HistoryScreen() {
  useEffect(() => {
    document.title = 'Mon historique'
  }, [])

  const { goals, history } = useSelector(selectState)
  const dispatch = useDispatch()

  return (
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Retour
      </Button>
      <Card className='history'>
        <CardHeader title='Historique' />
        <CardContent>
          <Typography>Coming soon: history</Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<ClearIcon />} variant='contained'>
            Effacer
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

function selectState({ goals, history }) {
  return { goals, history }
}
