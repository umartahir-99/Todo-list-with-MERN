import { Typography, Row, Col } from 'antd'



const {Paragraph} = Typography
const CopyRight = () => {

    const year = new Date().getFullYear()

  return (
    <footer className='w-full flex justify-center items-center py-2 bg-blue-900 shadow-blue-950'>
        <div className='container'>
            <Row className='justify-center'>
                <Col>
                <Paragraph className='text-center' style={{color : 'white'}}>  © {year}. All Rights Reserved</Paragraph>
                </Col>

            </Row>
        </div>
      
    </footer>
  )
}

export default CopyRight
