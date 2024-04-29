import React, { useEffect, useState } from 'react'
import { Editor, ShortcutKey } from 'amis-editor'
import { useParams } from 'react-router-dom'
import { toast } from 'amis'
import type { SchemaObject } from 'amis/lib/Schema'
import { makeEnv } from '../utils'
import uid from '../utils/uid'

export default function PageEditor() {
  const { pageId } = useParams()
  const [store, setStore] = useState({
    preview: false,
    schema: {
      type: 'page',
      body: {},
    } as SchemaObject,
  })
  useEffect(() => {
    let pageSchema: SchemaObject = {
      type: 'page',
      id: uid(),
      body: [],
    }
    if (pageId) {
      const pageData = localStorage.getItem(`editor-page-${pageId}`)
      pageSchema = (pageData && JSON.parse(pageData)) || pageSchema
    }
    setStore(prev => ({
      ...prev,
      schema: pageSchema,
    }))
  }, [pageId])

  function save() {
    toast.success('保存成功！')
  }

  function handleChange(data: any) {
    localStorage.setItem(`editor-page-${data.id}`, JSON.stringify(data))
  }

  return (
    <div className="Editor-Demo">
      <div className="Editor-header">
        <div className="Editor-title">可视化编辑器</div>
        <div className="Editor-header-actions">
          <ShortcutKey />
          <div
            className={`header-action-btn margin-left-space ${
              store.preview ? 'primary' : ''
            }`}
            onClick={() => {
              setStore(prev => ({
                ...prev,
                preview: !prev.preview,
              }))
            }}
          >
            {store.preview ? '编辑' : '预览'}
          </div>
        </div>
      </div>
      <div className="Editor-inner">
        <Editor
          theme="cxd"
          preview={store.preview}
          value={store.schema}
          onChange={(value: any) => handleChange(value)}
          onPreview={() => {
            // eslint-disable-next-line no-console
            console.log('preview')
          }}
          onSave={save}
          className="is-fixed"
          showCustomRenderersPanel={true}
          amisEnv={makeEnv({})}
        />
      </div>
    </div>
  )
}
