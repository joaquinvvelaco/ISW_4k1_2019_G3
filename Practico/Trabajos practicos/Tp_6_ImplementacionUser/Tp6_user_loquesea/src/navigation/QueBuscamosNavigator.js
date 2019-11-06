  import { createStackNavigator } from 'react-navigation-stack'
  
  import DondeBuscamos from '../screens/DondeBuscamos';
  import DondeEntregamos from '../screens/DondeEntregamos';
  import FormaDePago from '../screens/FormaDePago';
  import QueBuscamos from '../screens/QueBuscamos';
  
  const QueBuscamosStack = createStackNavigator({
    QueBuscamos: {screen: QueBuscamos},
    DondeBuscamos: {screen: DondeBuscamos},
    DondeEntregamos: {screen: DondeEntregamos},
    FormaDePago: {screen: FormaDePago},
    });
  
  export default QueBuscamosStack