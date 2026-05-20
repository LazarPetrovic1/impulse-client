import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
					<link rel="icon" href={`${__dirname}/public/short.png`} />
					<link
						rel="apple-touch-icon"
						href={`${__dirname}/public/apple-icon-180x180-dunplab-manifest-34821.png`}
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
						integrity="sha256-zmfNZmXoNWBMemUOo1XUGFfc0ihGGLYdgtJS3KCr/l0="
						crossOrigin="anonymous"
					/>
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
						integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
						crossOrigin="anonymous"
					/>
					<link rel="manifest" href={`${__dirname}/public/manifest.json`} />
					{/* <script defer src={`${base}/static/canvasThemes/rain.js`}></script> */}
					{/* <script defer src={`${base}/scripts/Vector2.js`}></script>
					<script defer src={`${base}/scripts/initlog.js`}></script>
					<script defer src={`${base}/scripts/blurfocus.js`}></script>
					<script defer src={`${base}/scripts/accelerators.js`}></script> */}
        </Head>
        <body>
					<div className="canvas-wrapper">
						{/* <canvas id="canvas" className="canvas-bg"></canvas> */}
						<NextScript />
					</div>
					<Main />
            <script
							src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
							integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
							crossOrigin='anonymous'
						></script>
						<script
							src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" crossOrigin='anonymous'
							integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
						></script>
						<script
							src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"
							integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+"
							crossOrigin='anonymous'
						></script>
        </body>
      </Html>
    )
  }
}
  
export default MyDocument