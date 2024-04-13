const Heading = ({ children, className = '' }) => {
  return (
    <h3
      className={`border-transparent whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none 
    text-primary ${className}`}
    >
      {children}
    </h3>
  )
}

const Tab = ({ children, isActive, className = '', onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`border-transparent whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none 
    ${
      isActive
        ? 'text-primary'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400'
    } ${className}`}
    >
      {children}
    </button>
  )
}

const ColumnHeader = {
  Heading,
  Tab,
}

export default ColumnHeader
