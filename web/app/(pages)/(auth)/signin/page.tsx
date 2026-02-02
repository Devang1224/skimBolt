
import { Suspense} from "react";
import SignInClient from "@/pages/SignInClient";


export default function SignIn() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInClient />
    </Suspense>
  );
}
