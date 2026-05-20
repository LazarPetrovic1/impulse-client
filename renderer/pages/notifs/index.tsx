import Head from 'next/head'
import { NotifPage } from '../../components/features/notifications'
import { AuthRoute } from '../../components/auth'

function NotificationsPage() {
  return (
    <AuthRoute>
      <div style={{ overflowY: "auto", width: "100%" }}>
        <Head>
          <meta name="title" content="Notifications" />
          <meta name="description" content="Welcome to Impulse - make an impact, change minds. Impulse is dedicated to your enjoyment and pleasure!" />
          <meta name="keywords" content="Log in, login, Impulse, impulse, impulse login" />
          <title>Impulse | Notifications</title>
        </Head>
        <NotifPage />
      </div>
    </AuthRoute>
  )
}

export default NotificationsPage