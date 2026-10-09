'use client'

import { useEffect, useState } from 'react'

function useWorkerMessage(workerUrl) {
  const [message, setMessage] = useState('pending')
  useEffect(() => {
    let worker
    import('worker-lib').then(({ createWorker }) => {
      worker = createWorker(
        workerUrl ? { workerUrl: new URL(workerUrl, location.href).href } : {}
      )
      worker.onmessage = (event) => setMessage(event.data)
    })
    return () => worker?.terminate()
  }, [workerUrl])
  return message
}

export default function Page() {
  const bundled = useWorkerMessage()
  const custom = useWorkerMessage('/custom-worker.js')
  return (
    <>
      <p id="bundled">{bundled}</p>
      <p id="custom">{custom}</p>
    </>
  )
}
