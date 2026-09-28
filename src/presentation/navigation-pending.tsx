import { useNavigation } from 'react-router-dom'

import { LoadingStatus } from './components/loading-status'

export function NavigationPending() {
  const navigation = useNavigation()

  if (navigation.state === 'idle') {
    return null
  }

  return <LoadingStatus className="navigation-pending" />
}
