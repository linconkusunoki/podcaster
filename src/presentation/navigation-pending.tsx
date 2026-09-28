import { useNavigation } from 'react-router-dom'

export function NavigationPending() {
  const navigation = useNavigation()

  if (navigation.state === 'idle') {
    return null
  }

  return (
    <div className="navigation-pending" role="status" aria-live="polite" aria-atomic="true">
      Loading...
    </div>
  )
}
