import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
const InputEditor: React.FC<{
  value: string
  label: string
  setValue: React.Dispatch<React.SetStateAction<any>>
}> = ({ value, setValue, label }) => {
  return (
    <div className='flex flex-col  gap-2'>
      <label className='flex justify-center w-full  text-sm text-secondary'>{label}</label>
      <Editor
        onChange={(e: any) => setValue(e.target.getContent())}
        apiKey={import.meta.env.VITE_REACT_APIKEY_TINYMCE}
        initialValue={`${value}`}
        init={{
          height: 500,
          menubar: false,
          toolbar:
            'formatselect | bold italic strikethrough | forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  )
}

export default InputEditor
