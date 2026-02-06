import { Typography, Row, Col } from 'antd'



const {Paragraph} = Typography
const CopyRight = () => {

    const year = new Date().getFullYear()

  return (
    <footer className='fixed bottom-0 left-0 right-0 flex justify-center items-center py-1 bg-blue-900 shadow-blue-950   '>
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
