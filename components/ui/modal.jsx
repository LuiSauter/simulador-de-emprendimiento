import * as Dialog from '@radix-ui/react-dialog'

const Modal = ({ children, setShowModal, showModal }) => {
  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-gray-100 dark:bg-black/50 bg-opacity-50 backdrop-blur-sm transform transition-all' />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className='fixed inset-0 z-50 m-auto md:max-h-fit w-full md:max-w-3xl overflow-auto border border-secondary2 bg-secondary shadow-xl md:rounded-xl'
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
