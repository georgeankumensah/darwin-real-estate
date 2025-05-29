import { Suspense } from "react"
import CustomersClientPage from "./client-page"

export default function CustomersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomersClientPage />
    </Suspense>
  )
}
