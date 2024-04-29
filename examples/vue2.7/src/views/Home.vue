<script>
import AmisRender from '@/components/AmisRender'

const schema = {
  title: '表单与列表之间的联动',
  body: [
    {
      title: '',
      type: 'form',
      mode: 'inline',
      target: 'list',
      wrapWithPanel: false,
      className: 'm-b',
      body: [
        {
          type: 'input-text',
          name: 'keywords',
          placeholder: '通过关键字搜索',
          clearable: true,
          addOn: {
            type: 'submit',
            icon: 'fa fa-search',
            level: 'primary',
          },
        },
      ],
    },
    {
      type: 'crud',
      name: 'list',
      api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample',
      mode: 'list',
      listItem: {
        actions: [
          {
            type: 'button',
            icon: 'fa fa-eye',
            actionType: 'dialog',
            dialog: {
              title: '查看',
              body: {
                type: 'form',
                body: [
                  {
                    type: 'static',
                    name: 'engine',
                    label: 'Engine',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'static',
                    name: 'browser',
                    label: 'Browser',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'static',
                    name: 'platform',
                    label: 'Platform(s)',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'static',
                    name: 'version',
                    label: 'Engine version',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'static',
                    name: 'grade',
                    label: 'CSS grade',
                  },
                ],
              },
            },
          },
          {
            type: 'button',
            icon: 'fa fa-pencil',
            actionType: 'dialog',
            dialog: {
              title: '编辑',
              body: {
                type: 'form',
                name: 'sample-edit-form',
                api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id',
                body: [
                  {
                    type: 'input-text',
                    name: 'engine',
                    label: 'Engine',
                    required: true,
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'input-text',
                    name: 'browser',
                    label: 'Browser',
                    required: true,
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'input-text',
                    name: 'platform',
                    label: 'Platform(s)',
                    required: true,
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'input-text',
                    name: 'version',
                    label: 'Engine version',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'input-text',
                    name: 'grade',
                    label: 'CSS grade',
                  },
                ],
              },
            },
          },
          {
            type: 'button',
            icon: 'fa fa-times text-danger',
            actionType: 'ajax',
            confirmText: '您确认要删除?',
            api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id',
          },
        ],
        body: [
          {
            name: 'engine',
            label: 'Rendering engine',
            labelClassName: 'w-sm',
          },
          {
            type: 'hbox',
            columns: [
              {
                name: 'browser',
                label: 'Browser',
                labelClassName: 'w-sm',
              },
              {
                name: 'platform',
                label: 'Platform(s)',
                labelClassName: 'w-sm',
              },
            ],
          },
          {
            name: 'version',
            label: 'Engine version',
            labelClassName: 'w-sm',
          },
        ],
      },
    },
  ],
}
export default {
  name: 'Home',
  components: {
    AmisRender,
  },
  data: () => ({
    schema,
    locals: {
      // 传递初始值
      name: 'Your Name',
    },
  }),
  computed: {},
}
</script>

<template>
  <AmisRender :schema="schema" :locals="locals" />
</template>
