import React from 'react'
import {Col, Row, Typography} from 'antd'

const {Title} = Typography

const FAQs= () => {
  return (
    <div className='py-1'>
    <div className="container">
        <Row>
            <Col span={24}>
            <Title className='text-center'>FAQs-Hero</Title>
            </Col>
        </Row>
    </div>
    </div>
  )
}

export default FAQs
