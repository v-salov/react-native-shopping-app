import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Col, Row, Grid } from "react-native-easy-grid"

export default () => {
  return (
    <Grid>
      <Row>
        <Col>
          <Text>COL1</Text>
        </Col>
        <Col>
          <Text>COL2</Text>
        </Col>
        <Col>
          <Text>COL3</Text>
        </Col>
        <Col>
          <Text>COL4</Text>
        </Col>
      </Row>
    </Grid>
  )
}
