const http = require('http')

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader('Content-Type', 'text/html')
  if (url === '/form') {
    res.write(
      `<html>
              <head><title>Yo My Website</title></head>
              <body>
              <form action="/message" method="POST">
                <input type="text" name="message">
                <button type="submit">Submit Dude</button>
               </form>
              </body>
            </html>
            `
    )
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    res.write(
      `<html>
              <head><title>Yo My Website</title></head>
              <body>
              <div>
                 <h2>Submitted !!!</h2>
                 <a href="/">Go Back Dude</a>
              </div>
              </body>
            </html> 
            `
    )
    return res.end()
  }
  res.write(
    `<html>
          <head><title>Yo My Website</title></head>
          <body>
            <h1>Sup</h1>
            <h2>DAmn Bro</h2>
            <p>Look great</p>
            <a href="/form">Submit ur message</a>
          </body>
        </html>
        `
  )
  res.end()
})

const PORT = 4000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))