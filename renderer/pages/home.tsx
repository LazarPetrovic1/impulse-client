import { PublicRoute } from "../components/auth";

function Home() {
  return (
    <PublicRoute>
      <h1>Hit!</h1>
    </PublicRoute>
  )
}

export default Home;