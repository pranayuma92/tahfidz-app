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
		        	<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
		        		<View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                  Makhrijul Huruf
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Mad
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Hukum Idgham
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Sifat Huruf
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Qolqolah
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Hukum Nun Sukun & Tanwin
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Hukum Mim Sukun
					                </Text>
					              </Body>
					            </CardItem>
					        </Card>
				        </View>
				        <View style={{width: '50%'}}>
				        	<Card containerStyle={{ height: '100%'}}>
					            <CardItem>
					              <Body>
					                <Text>
					                   Hukum Ra
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