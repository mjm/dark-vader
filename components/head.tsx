import NextHead from "next/head"

const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NextHead>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {children}
    </NextHead>
  )
}

export default Head
