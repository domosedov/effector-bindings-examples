import Link from 'next/link'

export default function Home() {
  return (
    <div className='container mx-auto'>
      <h1>Examples List</h1>
      <ul>
        <li>
          <Link href='/examples/rhf'>React Hook Form</Link>
        </li>
      </ul>
    </div>
  )
}
