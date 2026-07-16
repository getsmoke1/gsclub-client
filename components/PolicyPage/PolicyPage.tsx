import React from "react"

interface PolicyPageProps {
  title: string
  content: string // raw HTML from WP
}

const PolicyPage = ({ title, content }: PolicyPageProps) => {
  return (
    <div className="w-11/12 max-w-3xl mx-auto py-10 font-sans text-black">
      <h1 className="font-unbounded font-bold text-2xl mb-8">{title}</h1>
      <div
        className="prose prose-sm max-w-none text-gray-800 leading-relaxed
          [&_h2]:font-unbounded [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2
          [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-3
          [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-3
          [&_a]:text-purple-700 [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PolicyPage
