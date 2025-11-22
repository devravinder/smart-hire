
export default function ErrorCard({error}:{error: Error}) {
  return (
    <div>{error.message}</div>
  )
}
