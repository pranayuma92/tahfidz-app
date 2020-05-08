import React from 'react'
import { Header, Left, Body, Right, Title, Button, Icon, Subtitle } from 'native-base'

//Komponen utama
//Menerima 3 paramater yaitu title, subtitle dan navigation
const Navbar = ({ title, subtitle, navigation }) => {
	return (
        <Header style={{ backgroundColor: 'salmon', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} androidStatusBarColor="salmon">
       		{ navigation && 
	          <Left>
	            <Button transparent>
	              <Icon name="arrow-back" onPress={() => navigation.goBack()}/>
	            </Button>
	          </Left>
        	}
          <Body>
            <Title>{ title }</Title>
            { subtitle && <Subtitle>{subtitle}</Subtitle> }
          </Body>
          <Right />
        </Header>
	)
}

export default Navbar