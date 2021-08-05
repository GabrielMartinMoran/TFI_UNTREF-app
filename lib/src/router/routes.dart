import 'package:app/src/widgets/views/devices/add_device/add_device_screen.dart';
import 'package:app/src/widgets/views/devices/devices_list/devices_screen.dart';
import 'package:app/src/widgets/views/devices/view_device/view_device_screen.dart';
import 'package:app/src/widgets/views/error/error_screen.dart';
import 'package:app/src/widgets/views/home/home_screen.dart';
import 'package:app/src/widgets/views/login/login_screen.dart';
import 'package:flutter/material.dart';

class Routes {
  static final homeScreenGenerator = () => HomeScreen();

  static final errorScreenGenerator =
      (message) => ErrorScreen(message: message);

  static final loginScreenGenerator = () => LoginScreen();

  /* 
    ¡¡¡IMPORTANTE!!!
    - No pueden existir rutas con parametros luego de otra ruta com parametros:
        Ejemplo de error: primero '/route1/<int>' y luego '/route1/<int>/route2
    - No puede haber partes fijas de la ruta luego de que comienzan los parametros:
        Ejemplo de error: '/route1_part1/<int>/route1_part2'
  */
  static final Map routes = {
    '/login': () => LoginScreen(),
    '/devices': () => DevicesScreen(),
    '/devices/add': () => AddDeviceScreen(),
    '/devices/view/<string>': (List<dynamic> args) =>
        ViewDeviceScreen(deviceBleId: args[0]),
  };

  static String routeOf(Widget widgetName) {
    return '';
  }
}
