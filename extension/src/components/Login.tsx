interface LoginProps {
  isLoading: boolean;
}

const Login = ({isLoading}: LoginProps) => {
  return (
    <div className="flex h-full min-h-[100vh] items-center justify-center bg-gradient-to-br from-skimbolt-bg-gradient-start via-skimbolt-bg-gradient-mid to-skimbolt-bg-gradient-end px-3">
          <div
            className="w-full max-w-sm rounded-2xl border border-skimbolt-card-border bg-skimbolt-card-bg backdrop-blur-xl
                     shadow-[0_20px_40px_var(--color-skimbolt-card-shadow)] p-6 text-center space-y-5"
          >
            <img
              src="/skimboltLogo.svg"
              alt="SkimBolt logo"
              width={40}
              height={40}
              className="rounded-lg shadow-md mx-auto"
            />

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-skimbolt-text-primary">
                Skim
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
                  Bolt
                </span>
              </h1>
              <p className="text-sm text-skimbolt-text-secondary">
                AI-powered article summarizer
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-skimbolt-divider to-transparent" />

            <button
             disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-skimbolt-button-gradient-start to-skimbolt-button-gradient-end
                       px-4 py-2.5 text-sm font-medium text-skimbolt-text-white
                       shadow-lg shadow-[var(--color-skimbolt-button-shadow)]
                       transition-all duration-200
                       hover:translate-y-[-1px] hover:shadow-xl
                       active:translate-y-0 active:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-skimbolt-focus-ring focus:ring-offset-2 cursor-pointer"
              onClick={() => {
                chrome.tabs.create({
                  url: `${import.meta.env.VITE_WEB_URL}/signin`,
                });
              }}
            >
              {isLoading ? "Loading..." : "Login to continue"}
            </button>

            <p className="text-xs text-skimbolt-text-tertiary leading-relaxed">
              You’ll be redirected to the SkimBolt website to sign in securely.
            </p>
          </div>
        </div>
  )
}

export default Login
