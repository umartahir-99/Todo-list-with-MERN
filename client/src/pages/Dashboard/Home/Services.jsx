import React from 'react'
import {Col, Row, Typography} from 'antd'

const {Title} = Typography

const Services = () => {
  return (
    <div className='py-1'>
    <div className="container">
        <Row>
            <Col span={24}>
            <Title className='text-center'>Services-Hero</Title>
            </Col>
        </Row>
    </div>
    </div>
  )
}

export default Services
