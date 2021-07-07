import Head from 'next/head'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404: Not Found - Neptune Mutual</title>
      </Head>
      <div className='w-full h-full flex justify-center items-center py-12 px-4'>
        <div className='max-w-screen-sm text-center'>
          <div className='mx-auto mb-6 md:mb-10'>
            <div className='rounded-2xl border border-gray-600 text-gray-400 text-9xl py-12 px-8'>
              404
            </div>
          </div>
          <h3 className='text-gray-400 text-3xl leading-normal md:text-4xl md:leading-normal'>
            Resource Not Found
          </h3>
          <p className='text-gray-400 text-base'>
            We can not find the page you are looking for
          </p>
        </div>
      </div>
    </>
  )
}

export default NotFound
