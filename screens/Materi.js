import React from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Card, CardItem, Body, Text, Content } from 'native-base'
import NavbarDrawer from '../components/NavbarDrawer'

const Materi = ({ navigation }) => {
	const test = () => {
		alert('Button works great!')
	}

	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	        <NavbarDrawer title="Materi" navigation={navigation} />
	        <ScrollView>
	        	<Content padder>
		        	<Text style={{color: 'salmon', fontSize: 20, fontWeight: 'bold'}}>Makharijul Huruf</Text>
		        	<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
		        		<View style={{width: '25%'}}>
				        	<Card>
					            <CardItem>
					              <Body>
					                <Text>
					                   //Your text here
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '25%'}}>
				        	<Card>
					            <CardItem>
					              <Body>
					                <Text>
					                   //Your text here
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '25%'}}>
				        	<Card>
					            <CardItem>
					              <Body>
					                <Text>
					                   //Your text here
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '25%'}}>
				        	<Card>
					            <CardItem>
					              <Body>
					                <Text>
					                   //Your text here
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
			        </View>
		        </Content>
	        </ScrollView>
	    </Container>
	)
}

export default Materi