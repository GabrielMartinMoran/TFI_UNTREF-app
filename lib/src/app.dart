import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/providers/devices_provider.dart';
import 'package:app/src/providers/router_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:app/src/configs/pallete.dart';
import 'package:app/src/router/app_router_delegate.dart';
import 'package:app/src/router/router_information_parser.dart';

import 'configs/themes.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider<DevicesProvider>(
              create: (_) => DevicesProvider()),
          Provider<RouterProvider>(create: (_) => RouterProvider()),
          ChangeNotifierProvider<AppTitleProvider>(
              create: (_) => AppTitleProvider()),
        ],
        child: MaterialApp.router(
            debugShowCheckedModeBanner: false,
            title: 'Gestión de dispositivos',
            routeInformationParser: RouterInformationParser(),
            routerDelegate: AppRouterDelegate(),
            themeMode: Pallete.useLightTheme ? ThemeMode.light : ThemeMode.dark,
            theme: AppThemes.lightTheme,
            darkTheme: AppThemes.darkTheme));
  }
}
