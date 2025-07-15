
import { useState } from 'react'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
function Dashboard() {

  const  [modalOpen, setModalOpen] = useState(false)
  const contents = useContent();
  return (
    <div>
      <Sidebar></Sidebar>
      <div className='p-4 ml-72 min-h-screen bg-slate-100'>
      <CreateContentModal open={modalOpen} onClose={()=>{
        setModalOpen(false)
      }}></CreateContentModal>
      <div className='flex justify-end gap-4'>
      <Button startIcon={<ShareIcon size='lg'/>}variant='secondary' text='Share Brain' size='sm'></Button>
      <Button onClick={()=>{
        setModalOpen(true)
      }} startIcon={<PlusIcon size='lg'/>} variant='primary' text='Add content' size='md'></Button>
      </div>
      <div className='flex gap-4'>
      
      {contents.map(({type,link,title})=> <Card type={type} 
      link={link}
      title={title}></Card>)}
    
      </div>
      </div>
    </div>
  )
}

export default Dashboard