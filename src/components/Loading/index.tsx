import Spinner from 'react-loading'

import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.container}>
      <Spinner type='spin' color='#0064ff' />
    </div>
  )
}

export default Loading
