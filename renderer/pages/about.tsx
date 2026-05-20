import { About } from "../components/About";
import { PublicRoute } from "../components/auth";

export default function AboutPage() {
  return (
    <PublicRoute>
      <About />
    </PublicRoute>
  )
}