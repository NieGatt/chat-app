import { UserDataContext } from "./context/UserDataContext"
import { Router } from "./routes"

export const App = () => {
  return <UserDataContext>{<Router />}</UserDataContext>
}