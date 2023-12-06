import CreateProject from '@/components/form-add-update-project'
import { useCallback, useMemo, useState } from 'react'

export function useModal ({ update, project }) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const modalCallback = useCallback(() => {
    return (
      <CreateProject
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        update={update}
        project={project}
      />
    )
  }, [showCreateModal, setShowCreateModal])

  return useMemo(() => ({ CreateProjectModal: modalCallback, setShowCreateModal }), [modalCallback, setShowCreateModal])
}
