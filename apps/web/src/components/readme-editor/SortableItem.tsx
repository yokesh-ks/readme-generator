import { Card } from '@camped-ui/card'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@readme/icon'

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const onClickSection = () => {
    localStorage.setItem('current-focused-slug', props.id)
    props.setFocusedSectionSlug(props.id)
  }

  const onClickTrash = (e) => {
    props.onDeleteSection(e, props.section.slug)
  }

  const onClickReset = (e) => {
    const sectionResetConfirmed = window.confirm(
      'The section will be reset to default template; to continue, click OK',
    )
    if (sectionResetConfirmed === true) {
      props.onResetSection(e, props.section.slug)
    }
  }

  const onKeyUp = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      onClickSection()
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClickSection}
      onKeyUp={onKeyUp}
      className={`pl-1 pr-14 py-2 flex items-center cursor-pointer relative select-none ${
        props.section.slug === props.focusedSectionSlug ? 'ring-2 primary' : ''
      }`}
    >
      <button
        type='button'
        className='mr-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary'
        {...listeners}
      >
        <Icon name='GripVertical' className='w-5 h-5' />
      </button>
      <p>{props.section.name}</p>
      {props.section.slug === props.focusedSectionSlug && (
        <>
          <button
            className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary absolute right-8'
            type='button'
            aria-label='Reset section'
            onClick={onClickReset}
          >
            <Icon name='RotateCcw' className='h-4 w-4' />
          </button>
          <button
            className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary absolute right-2'
            type='button'
            aria-label='Delete section'
            onClick={onClickTrash}
          >
            <Icon name='Trash2' className='h-4 w-4' />
          </button>
        </>
      )}
    </Card>
  )
}
