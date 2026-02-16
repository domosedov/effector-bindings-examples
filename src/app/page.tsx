import Link from 'next/link'

export default function Home() {
  return (
    <div className='container-base py-8'>
      <h1 className='mb-6'>Examples List</h1>
      <ul className='space-y-2'>
        <li>
          <Link href='/examples/rhf'>React Hook Form</Link>
        </li>
        <li>
          <Link href='/examples/rq'>React Query</Link>
        </li>
      </ul>
    </div>
  )
}
