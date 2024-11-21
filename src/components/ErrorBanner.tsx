
interface ErrorBannerProps {
  message: string
}

const ErrorBanner = ({message}: ErrorBannerProps) => {
  const errorMessage = message || '에러입니다.'
  return (
    <div style={{backgroundColor: 'red'}}>{errorMessage}</div>
  )
}

export default ErrorBanner