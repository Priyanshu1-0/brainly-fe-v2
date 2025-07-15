
import { useEffect, useState } from 'react'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'
function Dashboard() {

  const  [modalOpen, setModalOpen] = useState(false)
  const {contents,refresh} = useContent();

  useEffect(()=>{
    refresh();
  },[modalOpen])

  return (
    <div>
      <Sidebar></Sidebar>
      <div className='p-4 ml-72 min-h-screen bg-slate-100'>
      <CreateContentModal open={modalOpen} onClose={()=>{
        setModalOpen(false)
      }}></CreateContentModal>
      <div className='flex justify-end gap-4'>
      <Button onClick={async ()=>{
       const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
        share:true
       },{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
       })
       const shareUrl  = `http://localhost:5173/share/${response.data.link}` 
       alert(shareUrl)
      }} startIcon={<ShareIcon size='lg'/>}variant='secondary' text='Share Brain' size='sm'></Button>
      <Button onClick={()=>{
        setModalOpen(true)
      }} startIcon={<PlusIcon size='lg'/>} variant='primary' text='Add content' size='md'></Button>
      </div>
      <div className='flex gap-4 flex-wrap'>
      
      {contents.map(({type,link,title})=> <Card type={type} 
      link={link}
      title={title}></Card>)}
    
      </div>
      </div>
    </div>
  )
}

export default Dashboard