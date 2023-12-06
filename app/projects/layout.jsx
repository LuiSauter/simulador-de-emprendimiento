import Nav from '@/components/nav'

export default function ProjectLayout({ children }) {
  return (
    <div className='min-h-screen'>
      <Nav />
      {children}
    </div>
  )
}
