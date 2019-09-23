import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import QueBuscamosStack from './QueBuscamosNavigator'
import Menu from '../screens/Menu'
import PedidoEnviado from '../screens/PedidoEnviado'

export default createAppContainer(
    createSwitchNavigator({
      QueBuscamos: { screen: QueBuscamosStack },
      Menu: {screen: Menu},
      PedidoEnviado: {screen: PedidoEnviado}
    },
  
    {
      // initialRouteName: 'AuthLoading',
      initialRouteName: 'Menu',
    })
  );