import 'package:app/src/configs/pallete.dart';
import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/widgets/menu/app_menu.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AppScaffold extends StatefulWidget {
  final Widget child;
  final Function navigateTo;
  const AppScaffold({Key? key, required this.child, required this.navigateTo})
      : super(key: key);

  @override
  _AppScaffoldState createState() => _AppScaffoldState();
}

class _AppScaffoldState extends State<AppScaffold> {
  @override
  Widget build(BuildContext context) {
    final appTitleProvider = Provider.of<AppTitleProvider>(context);
    return Scaffold(
        appBar: AppBar(
          title: Text(appTitleProvider.appTitle,
              style: TextStyle(color: Pallete.overSurface)),
          backgroundColor: Pallete.surface,
        ),
        body: widget.child,
        backgroundColor: Pallete.background,
        drawer: AppMenu(navigateTo: widget.navigateTo));
  }
}
