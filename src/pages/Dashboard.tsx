
import { useState } from 'react'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { Sidebar } from '../components/ui/Sidebar'
function Dashboard() {

  const  [modalOpen, setModalOpen] = useState(false)

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
      <Card type='Twitter' link='https://x.com/NealGardner_/status/1944506840899096654' title='PSG vs Chelsea'></Card>
      <Card type='Youtube' link='https://www.youtube.com/watch?v=vHua-t_8hrA' title='Leetcode'></Card>
      </div>
      </div>
    </div>
  )
}

export default Dashboard