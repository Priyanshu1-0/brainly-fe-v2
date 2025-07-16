
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
import Masonry from 'react-masonry-css';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from "lucide-react";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent() as { contents: any[], refresh: () => void };
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [showShare, setShowShare] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [modalOpen])

  // Responsive sidebar offset
  const [sidebarOffset, setSidebarOffset] = useState('ml-72')
  useEffect(() => {
    const handleResize = () => {
      setSidebarOffset(window.innerWidth < 768 ? 'ml-0' : 'ml-72')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Share handler
  async function handleShare() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    setShareUrl(`${window.location.origin}/share/${response.data.link}`)
    setShowShare(true)
  }

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  // Close share modal on overlay click
  function handleShareOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) setShowShare(false);
  }

  // Delete handler
  async function handleDeleteContent(id: string) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (deleteId) {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: deleteId },
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setShowDeleteModal(false);
      setDeleteId(null);
      refresh();
    }
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setDeleteId(null);
  }

  function handleDeleteOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) cancelDelete();
  }

  return (
    <div className="relative min-h-screen bg-white font-['Inter']">
      <Sidebar onFilterType={setFilterType} activeType={filterType} />
      <main className={`relative z-10 transition-all duration-300 ${sidebarOffset} px-2 pt-6 pb-16 min-h-screen`}> 
        <div className="w-full md:max-w-6xl md:mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 px-2">
            <div>
              <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tracking-tight">What's on your mind</h1>
            </div>
          </header>

          {/* Button Row - small, top right */}
          <div className="flex justify-end gap-2 mb-6 px-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <ShareIcon size="lg" />
              <span>Share Brain</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <PlusIcon size="lg" />
              <span>Add Thoughts</span>
            </button>
          </div>

          {/* Share Link Modal - elegant, animated, responsive */}
          <AnimatePresence>
            {showShare && shareUrl && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleShareOverlayClick}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center font-['Inter'] relative"
                  initial={{ scale: 0.95, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setShowShare(false)}
                    aria-label="Close"
                  >
                    <span className="text-xl">×</span>
                  </button>
                  <ShareIcon size="lg" />
                  <h2 className="text-xl font-bold mt-2 mb-4 text-gray-900">Share your Brain</h2>
                  <input
                    className="w-full bg-gray-100 rounded-lg px-4 py-2 text-gray-700 font-mono text-sm mb-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                    value={shareUrl}
                    readOnly
                    onFocus={e => e.target.select()}
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl)
                      setShowShare(false)
                    }}
                    text="Copy Link"
                    variant="primary"
                    size="md"
                    fullWidth={true}
                  />
                  <button
                    className="mt-2 text-gray-400 hover:text-gray-700 text-xs underline"
                    onClick={() => setShowShare(false)}
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Masonry Content Grid */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-8 w-full"
            columnClassName="masonry-column"
          >
            {contents.filter(c => !filterType || c.type === filterType).length === 0 && (
              <div className="w-full flex flex-col items-center justify-center min-h-[40vh] text-center">
                <span className="text-gray-400 text-lg font-semibold">No thoughts yet...</span>
              </div>
            )}
            {contents.filter(c => !filterType || c.type === filterType).map((content, idx) => (
              <div key={(content.id || content._id) + idx} className="mb-8">
                <Card
                  id={content.id || content._id}
                  type={content.type}
                  link={content.link}
                  title={content.title}
                  onDelete={handleDeleteContent}
                />
              </div>
            ))}
          </Masonry>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteModal && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleDeleteOverlayClick}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center font-['Inter'] relative"
                  initial={{ scale: 0.95, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={cancelDelete}
                    aria-label="Close"
                  >
                    <span className="text-xl">×</span>
                  </button>
                  <Trash2 size={36} className="text-red-500 mb-2" />
                  <h2 className="text-xl font-bold mt-2 mb-4 text-gray-900 text-center">Are you sure you want to forget the thought?</h2>
                  <div className="flex gap-4 mt-4">
                    <Button
                      onClick={confirmDelete}
                      text="Yes, Forget"
                      variant="primary"
                      size="md"
                    />
                    <Button
                      onClick={cancelDelete}
                      text="No, Keep"
                      variant="secondary"
                      size="md"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default Dashboard