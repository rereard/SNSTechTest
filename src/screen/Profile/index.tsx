import {Image, Linking, StyleSheet, View} from 'react-native';
import {ScrollView, Text} from 'react-native-gesture-handler';
import {globalStyles} from '../../utils/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostBox from '../../component/PostBox';
import IonIcon from '@react-native-vector-icons/ionicons';

export default function Profile(): React.JSX.Element {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={{paddingVertical: 10, paddingHorizontal: 16}}>
        <View>
          <Text style={globalStyles.headerTitle}>myProfile</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.imgContainer}>
            <Image source={require('./img/rr.png')} style={styles.image} />
          </View>
          <Text style={styles.nameText}>Muhammad Rere Ardany</Text>
          <Text>Hi! I'm a Web and Mobile Dev</Text>
          <View style={styles.socials}>
            <IonIcon
              name="logo-github"
              size={25}
              onPress={() => Linking.openURL('https://github.com/rereard')}
            />
            <IonIcon
              name="logo-linkedin"
              size={25}
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/rereardany/')
              }
            />
            <IonIcon
              name="logo-instagram"
              size={25}
              onPress={() =>
                Linking.openURL('https://www.instagram.com/rereardany')
              }
            />
            <IonIcon
              name="link-outline"
              size={25}
              onPress={() => Linking.openURL('https://rereardany.vercel.app/')}
            />
          </View>
        </View>
        <View style={{marginTop: 25}}>
          <Text style={styles.nameText}>About Me:</Text>
          <Text style={{textAlign: 'justify'}}>
            A fresh graduate in Computer Science with a GPA of 3.86, possessing
            strong skills in web and mobile development using JavaScript,
            React.js, Flutter, React Native, and Next.js. Successfully developed
            a shortest route application for tourist attractions using
            Dijkstra's Algorithm on Android. Highly committed to learning and
            applying the latest technologies to contribute optimally to software
            development.
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={[styles.nameText, {marginBottom: 10}]}>
            Work Examples:
          </Text>
          <PostBox
            title="Tourism Information System and Route Search Apps"
            username="Mobile Apps"
            desc={`Mobile tourist attraction information system that also can find the shortest route to tourist attractions in Jepara Regency using Dijkstra's Algorithm, developed with React Native, Firebase, and Google Maps API as a thesis project.`}
            onPress={() =>
              Linking.openURL('https://github.com/rereard/WisataJepara')
            }
          />
          <PostBox
            title="Hospital Appointment System"
            username="Website"
            desc={`A hospital appointment system website developed using vanilla PHP, jQuery, HTML, Bootstrap, and a MySQL database for the Web Developer certification scheme at LSP UDINUS.`}
            onPress={() =>
              Linking.openURL('https://github.com/rereard/hospital_appointment')
            }
          />
          <PostBox
            title="E-Commerce Webite"
            username="Website"
            desc={`Ready to use E-Commerce website developed using React.Js and Tailwind CSS for Hacktiv8 Front-End Program final project`}
            onPress={() =>
              Linking.openURL('https://github.com/Hacktiv8-Group-14/E-Commerce')
            }
          />
          <PostBox
            title="Boarding House Reservation Apps"
            username="Mobile Apps"
            desc={`Mobile application for finding and advertising boarding houses near UDINUS campus, built with React Native and Firebase as a Software Engineering course final project.`}
            onPress={() =>
              Linking.openURL('https://github.com/rereard/kos_reservasi')
            }
          />
          <PostBox
            title="Movie DB Site"
            username="Website"
            desc={`Movie Database website created using Next.js for Hacktiv8 Front-End Program final project`}
            onPress={() => Linking.openURL('https://hackflix-h8.vercel.app/')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
  },
  socials: {
    flexDirection: 'row',
    gap: 17,
    marginTop: 5,
  },
});
