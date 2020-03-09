import React from 'react';
import {Container, ColContainer, ContainerButton} from '../../../Styles/index'
import { Menu, Dropdown,Button, Row} from 'antd'


const SelectTypeOfChange = (props) => {

    const {allCategorys, CategoryClicked, quitFilters, CategoryClickedB} = props;
    const typesOptionA = (
        <Menu>
          {
            allCategorys.map(category => {                
              return (
                <Menu.Item key={category.name} onClick={() => CategoryClicked(category.code)}>
                  {`${category.code} / ${category.name}`}
                </Menu.Item>
              )
            })
          }
        </Menu>
      )

      const typesOptionB = (  
        <Menu>
          {
            allCategorys.map(category => {                
              return (
                <Menu.Item key={category.name} onClick={() => CategoryClickedB(category.code)}>
                  {`${category.code} / ${category.name}`}
                </Menu.Item>
              )
            })
          }
        </Menu>
      )

      const size = {
        xs: {span: 12},
        lg: {span: 12},
        xl: {span: 12}
      }

    return (
        <Container>
          <Row>
            <ColContainer {...size}>
              <Dropdown overlay={typesOptionA}>
                <Button className='ant-dropdown-link BottomHeader '>
                  SelectType of Change 
                </Button>
              </Dropdown> 
              <ContainerButton>
                 <Button onClick={quitFilters}>Quit Filters</Button>
              </ContainerButton>
            </ColContainer>
            <ColContainer {...size}>
              <Dropdown overlay={typesOptionB}>
                <Button className='ant-dropdown-link BottomHeader '>
                  SelectType of Change 
                </Button>
              </Dropdown>
            </ColContainer>
           
          </Row>
        </Container>
    );
};

export default SelectTypeOfChange;