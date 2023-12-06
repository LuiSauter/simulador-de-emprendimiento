import * as Popover from '@radix-ui/react-popover'

const DropdownMenu = ({
  children,
  content,
  align,
  openPopover,
  setOpenPopover
}) => {
  return (
    <Popover.Root open={openPopover} onOpenChange={setOpenPopover}>
      <Popover.Trigger className='inline-flex' asChild>
        {children}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align={align}
          className='z-50 items-center rounded-lg border bg-primary border-secondary2 shadow-md shadow-primary/50 w-fit relative'
        >
          {content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default DropdownMenu
