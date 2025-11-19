import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/hooks/use-auth"
import { Navigate } from "react-router"
import { APP } from "@/constants"

export default function LoginPage() {
 const {session} = useAuth()
 if(session)
   return <Navigate to={"/chat"}/>
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {APP.name}
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
