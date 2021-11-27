import React from "react";
import { Col, Row, Collapse, Spin, Typography, Avatar } from "antd";
import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  console.log(data);

  if (isFetching)
    return (
      <div className="loader">
        <Spin />
      </div>
    );

  return (
    <>
      <Row>
        <Col span={6}>
          <Title level={5}>Exchanges</Title>
        </Col>
        <Col span={6}>
          <Title level={5}>24h Trade Volume</Title>
        </Col>
        <Col span={6}>
          <Title level={5}>Market</Title>
        </Col>
        <Col span={6}>
          <Title level={5}>Change</Title>
        </Col>
      </Row>
      <Collapse defaultActiveKey={["1"]}>
        {data?.data?.exchanges?.map((exchange) => (
          <Panel
            showArrow={false}
            key={exchange.id}
            header={
              <>
                <Col span={6}>
                  <Title level={5}>
                    {exchange.rank}.
                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                    {exchange.name}
                  </Title>
                </Col>
                <Col span={6}>
                  <Text>{millify(exchange.volume)}</Text>
                </Col>
                <Col span={6}>
                  <Text level={5}>{millify(exchange.numberOfMarkets)}</Text>
                </Col>
                <Col span={6}>
                  <Text level={5}>{millify(exchange.marketShare)}</Text>
                </Col>
              </>
            }
          >
            {HTMLReactParser(exchange.description || "")}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Exchanges;
