import { Suspense } from "react"
import OwnersClientPage from "./client-page"

export default function OwnersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OwnersClientPage />
    </Suspense>
  )
}
  