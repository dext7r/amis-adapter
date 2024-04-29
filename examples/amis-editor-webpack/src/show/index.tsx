import { render } from 'amis'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { makeEnv } from '../utils'

export default function PageShow() {
  const { pageId } = useParams()
  const [schema, setSchema] = useState({
    type: 'page',
    body: {},
  })
  useEffect(() => {
    if (pageId) {
      const pageData = localStorage.getItem(`editor-page-${pageId}`)
      const pageSchema = pageData && JSON.parse(pageData)
      setSchema(pageSchema)
    }
  }, [pageId])

  return (
    <div>
      {
      render(schema, {}, makeEnv({}))
    }
    </div>
  )
}
